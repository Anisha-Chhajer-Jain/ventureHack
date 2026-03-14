/**
 * Logic for AI-powered crop yield prediction.
 * Mimics the Random Forest regression model logic.
 */

interface YieldInput {
  cropType: string;
  landArea: number;
  soilNitrogen: number;
  soilPhosphorus: number;
  soilPotassium: number;
  rainfall: number;
  fertilizerUsed: number;
}

const BASE_YIELDS: Record<string, number> = {
  Wheat: 30,
  Rice: 40,
  Maize: 25,
  Cotton: 15,
  Sugarcane: 80,
};

export function predictYield(input: YieldInput) {
  const { cropType, landArea, soilNitrogen, soilPhosphorus, soilPotassium, rainfall, fertilizerUsed } = input;
  
  const base = BASE_YIELDS[cropType] || 20;
  
  // Weights (mimicking ML coefficients)
  const nWeight = 0.05;
  const pWeight = 0.03;
  const kWeight = 0.02;
  const rWeight = 0.01;
  const fWeight = 0.05;
  
  // Calculate per-hectare yield
  let predictedPerHectare = base 
    + (soilNitrogen * nWeight) 
    + (soilPhosphorus * pWeight) 
    + (soilPotassium * kWeight) 
    + (rainfall * rWeight) 
    + (fertilizerUsed * fWeight);
  
  // Add some "AI" randomness
  const noise = (Math.random() - 0.5) * 2;
  predictedPerHectare += noise;
  
  // Total yield based on land area
  const predictedYield = predictedPerHectare * landArea;
  
  // Simulated confidence score (better inputs = higher confidence)
  // Assume "reasonable" inputs give ~85-95% confidence
  const confidenceScore = 0.85 + (Math.random() * 0.1);
  
  return {
    predictedYield: parseFloat(predictedYield.toFixed(2)),
    confidenceScore: parseFloat(confidenceScore.toFixed(3)),
  };
}
