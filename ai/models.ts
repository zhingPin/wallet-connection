type AssistantModelType = {
    name: string;
    description: string;
    max_tokens: number;
    temperature: number;
    streaming: boolean;
    clientOptions?: {
        defaultHeaders?: Record<string, string>;
    };
};

const models: Record<string, AssistantModelType> = {
    "gpt-3.5-turbo": {
        name: "gpt-3.5-turbo",
        description: "A model that can understand and generate natural language or code.",
        max_tokens: 4096,
        temperature: 0.7,
        streaming: true,
    },
    "gpt-40-mini": {
        name: "gpt-40-mini",
        description: "An advanced model with improved capabilities for complex tasks.",
        max_tokens: 8192,
        streaming: true,
        temperature: 0.7,
    },
    "claude-2": {
        name: "claude-2",
        description: "A model designed for conversational AI with a focus on understanding context.",
        max_tokens: 4096,
        temperature: 0.7,
        streaming: true,
        clientOptions: {
            defaultHeaders: {
                "anthropic-beta": "prompt-caching-2024-07-31",
            },
        },

    },
    "claude-3": {
        name: "claude-3",
        description: "An advanced conversational AI model with enhanced understanding and generation capabilities.",
        max_tokens: 8192,
        temperature: 0.7,
        streaming: true,
    },
};

const initialiseModels = (model: string) => {
    const foundModel = models[model] || Object.values(models).find(m => m.name === model);
    if (foundModel) {
        // Initialize the model with its specific settings
        console.log(`Initializing model: ${foundModel.name}`);
        // Additional initialization logic here
    } else {
        console.error(`Model not found: ${model}`);
        return null;
    }
    callbacks: [
        {
            handleLLMStart: async () => {
                console.log("LLM started");
            },
            handleLLMEnd: async (output: any) => {
                console.log("LLM ended with response:", output);
                const usage = output.llmOutput?.usage;
                if (usage) {
                    console.log(`Tokens used: ${usage.total_tokens}`);
                }
            },
        }
    ]
};  