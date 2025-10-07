import { GoogleGenAI, Type, Modality } from "@google/genai";
import { DesignResult, Product } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = (error) => reject(error);
    });
};

const productListSchema = {
    type: Type.OBJECT,
    properties: {
        products: {
            type: Type.ARRAY,
            description: "List of furniture and decor items.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Product name" },
                    price: { type: Type.NUMBER, description: "Price in Indian Rupees (INR)" },
                    retailer: { type: Type.STRING, description: "e.g., IKEA India, Pepperfry, Fabindia, Amazon.in" },
                    link: { type: Type.STRING, description: "A generic, high-quality SEARCH URL on a major Indian e-commerce site (like Amazon.in, Pepperfry, Fabindia) for the product. This should NOT be a direct link to a specific product page, but a search query that will yield relevant results." },
                },
                required: ["name", "price", "retailer", "link"],
            },
        },
    },
    required: ["products"],
};

const hotspotsSchema = {
    type: Type.OBJECT,
    properties: {
        hotspots: {
            type: Type.ARRAY,
            description: "List of identified products and their locations in the image.",
            items: {
                type: Type.OBJECT,
                properties: {
                    productName: { type: Type.STRING, description: "The name of the product, exactly matching one from the provided list." },
                    boundingBox: {
                        type: Type.OBJECT,
                        description: "The bounding box of the object, with coordinates as percentages (0-100) from the top-left corner.",
                        properties: {
                            x: { type: Type.NUMBER, description: "The x-coordinate of the top-left corner as a percentage of image width." },
                            y: { type: Type.NUMBER, description: "The y-coordinate of the top-left corner as a percentage of image height." },
                            width: { type: Type.NUMBER, description: "The width of the box as a percentage of image width." },
                            height: { type: Type.NUMBER, description: "The height of the box as a percentage of image height." },
                        },
                        required: ["x", "y", "width", "height"],
                    },
                },
                required: ["productName", "boundingBox"],
            }
        }
    },
    required: ["hotspots"],
};

const getProductSuggestions = async (prompt: string): Promise<{ products: Product[], totalCost: number }> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: productListSchema,
        },
    });

    const jsonResponse = JSON.parse(response.text);
    const products = jsonResponse.products || [];
    const totalCost = products.reduce((sum: number, item: Product) => sum + item.price, 0);
    return { products, totalCost };
};

const getHotspotsForProducts = async (base64Image: string, mimeType: string, products: Product[]): Promise<Product[]> => {
    const productNames = products.map(p => p.name).join(', ');
    const prompt = `You are a meticulous and highly precise Computer Vision Specialist. Your sole task is to identify specific objects from a list within an image and provide their exact bounding box coordinates. Precision is paramount.

**Product List to find:** [${productNames}]

**Instructions:**
1.  **Analyze:** Scrutinize the provided image to locate every item from the Product List.
2.  **Verify:** For each potential match, confirm it is the correct item.
3.  **Bound with Precision:** Define the tightest possible bounding box for each confirmed item.
    - The box must contain the entire object and nothing else.
    - Minimize empty space (padding) around the object within the box.
    - The box must not include shadows or other nearby objects.
4.  **Format:** Return the coordinates as percentages (0.0 to 100.0) from the top-left corner. The 'productName' must be an exact, case-sensitive match from the provided list.

**CRITICAL RULES for ACCURACY:**
- **TIGHT FIT IS MANDATORY:** A bounding box for a 'round cushion' should tightly wrap the cushion's visible pixels, not the empty space on the sofa next to it. A box for a 'potted plant' should include the pot and the plant, but not the floor around it.
- **DO NOT GUESS:** If you are not 100% certain about an object's location or its full boundaries are obscured, **OMIT the hotspot for that object**. An omitted hotspot is far better than an inaccurate one.
- **NO OVERLAPPING:** If two distinct products from the list are next to each other, their bounding boxes should not overlap unless the items themselves physically overlap in the image.
- **HANDLE OCCLUSION:** If an object is partially hidden (e.g., a chair behind a table), the bounding box must only cover the visible parts of that object.

For example, if you find a 'Floor Lamp', the box should be \`{"x": 75.2, "y": 30.5, "width": 8.1, "height": 45.3}\`, not \`{"x": 70, "y": 25, "width": 15, "height": 55}\`. The first is precise; the second is a loose, inaccurate guess.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { inlineData: { data: base64Image, mimeType } },
                    { text: prompt },
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: hotspotsSchema,
            },
        });
        const jsonResponse = JSON.parse(response.text);
        
        const validHotspots = (jsonResponse.hotspots || []).filter((h: any) => {
            const box = h.boundingBox;
            if (!box) return false;
            const { x, y, width, height } = box;
            const isValidNumber = (num: any) => typeof num === 'number' && !isNaN(num);
            return (
                isValidNumber(x) && x >= 0 && x <= 100 &&
                isValidNumber(y) && y >= 0 && y <= 100 &&
                isValidNumber(width) && width > 0 && (x + width) <= 100.1 &&
                isValidNumber(height) && height > 0 && (y + height) <= 100.1
            );
        });

        const productsWithHotspots = products.map(product => {
            const foundHotspot = validHotspots.find((h: any) => h.productName === product.name);
            if (foundHotspot) {
                return {
                    ...product,
                    hotspot: foundHotspot.boundingBox
                };
            }
            return product;
        });
        return productsWithHotspots;

    } catch (error) {
        console.error("Could not generate hotspots, returning products without them.", error);
        return products;
    }
};

const getIndianDesignPromptEnhancement = (isIndian: boolean): { image: string, product: string } => {
    if (!isIndian) return { image: '', product: '' };
    return {
        image: "Incorporate authentic Indian design elements. This could include traditional motifs, architectural features like jharokhas or arches, intricate carvings (jali work), rich textiles like silk or block prints, and decor items like brass lamps, pichwai or madhubani paintings. The overall feel should be distinctly and tastefully Indian.",
        product: "Prioritize products that reflect traditional Indian craftsmanship and aesthetics. Search for items on Indian retail sites known for ethnic or artisan goods (like Fabindia, Okhai, Jaypore) in addition to major platforms."
    };
};

export const redesignImage = async (
    imageFile: File,
    styles: string[],
    budget: string,
    description: string,
    designTradition: 'Indian' | 'Western'
): Promise<Omit<DesignResult, 'id'>> => {
    const base64Image = await fileToBase64(imageFile);
    const mimeType = imageFile.type;
    
    const isIndian = designTradition === 'Indian';
    const enhancements = getIndianDesignPromptEnhancement(isIndian);

    const styleText = styles.length > 0 ? `in a ${styles.join(', ')} aesthetic` : '';
    const descriptionText = description ? `The user provided these specific details: "${description}"` : '';

    const redesignPrompt = `Redesign this room ${styleText}. Preserve the room's core structure like walls and windows, but replace the furniture and decor to match the new style. ${descriptionText} ${enhancements.image} Focus on achieving the user's vision.`;
    const productPrompt = `You are an expert AI shopping assistant. Your task is to scour the Indian web for the best-rated, most popular, and readily available products for a room redesign in the ${styles.join(', ')} style, with a total budget of around ${budget}. ${descriptionText} ${enhancements.product} All prices must be in Indian Rupees (INR). IMPORTANT: For each product's 'link', you MUST provide a high-quality, generic search URL on a major Indian retailer (like Amazon.in, Pepperfry, or Fabindia) that is highly likely to return relevant, in-stock results. Do NOT use direct product links.`;

    const [imageResponse, productData] = await Promise.all([
        ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: base64Image, mimeType } },
                    { text: redesignPrompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        }),
        getProductSuggestions(productPrompt),
    ]);
    
    let imageUrl = '';
    let generatedImageBase64 = '';
    let generatedImageMimeType = '';
    const imagePart = imageResponse.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

    if (imagePart && imagePart.inlineData) {
        generatedImageBase64 = imagePart.inlineData.data;
        generatedImageMimeType = imagePart.inlineData.mimeType;
        imageUrl = `data:${generatedImageMimeType};base64,${generatedImageBase64}`;
    } else {
        throw new Error("AI did not return an image.");
    }
    
    const productsWithHotspots = await getHotspotsForProducts(generatedImageBase64, generatedImageMimeType, productData.products);

    return { ...productData, products: productsWithHotspots, imageUrl };
};

export const generateDesignFromText = async (
    roomType: string,
    dimensions: string,
    styles: string[],
    budget: string,
    description: string,
    designTradition: 'Indian' | 'Western'
): Promise<Omit<DesignResult, 'id'>> => {
    
    const isIndian = designTradition === 'Indian';
    const enhancements = getIndianDesignPromptEnhancement(isIndian);

    const styleText = styles.length > 0 ? `designed in a beautiful ${styles.join(', ')} aesthetic` : '';
    const descriptionText = description ? `The user provided these specific details: "${description}"` : '';

    const imagePrompt = `Generate a photorealistic, high-quality image of a ${roomType}, approximately ${dimensions}, ${styleText}. ${descriptionText} ${enhancements.image} The lighting should be bright and inviting. Base the design heavily on the user's description.`;
    const productPrompt = `You are an expert AI shopping assistant. Your task is to scour the Indian web for the best-rated, most popular, and readily available products for a ${roomType} designed in the ${styles.join(', ')} style, with a total budget of around ${budget}. ${descriptionText} ${enhancements.product} All prices must be in Indian Rupees (INR). IMPORTANT: For each product's 'link', you MUST provide a high-quality, generic search URL on a major Indian retailer (like Amazon.in, Pepperfry, or Fabindia) that is highly likely to return relevant, in-stock results. Do NOT use direct product links.`;

    const [imageResponse, productData] = await Promise.all([
        ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: imagePrompt,
            config: {
                numberOfImages: 1,
                aspectRatio: '16:9'
            },
        }),
        getProductSuggestions(productPrompt),
    ]);

    const generatedImage = imageResponse.generatedImages?.[0];
    if (!generatedImage?.image?.imageBytes) {
        throw new Error("AI did not generate an image.");
    }

    const generatedImageBase64 = generatedImage.image.imageBytes;
    const imageUrl = `data:image/jpeg;base64,${generatedImageBase64}`;
    
    const productsWithHotspots = await getHotspotsForProducts(generatedImageBase64, 'image/jpeg', productData.products);

    return { ...productData, products: productsWithHotspots, imageUrl };
};