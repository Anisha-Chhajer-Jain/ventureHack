export interface Product {
    id: number;
    name?: string;
    translationKey?: string;
    tag?: string;
    description?: string;
    longDescription?: string;
    features?: string[];
    color: string;
    price: string;
    imageUrl: string;
    usage?: Record<string, string>;
}

export const products: Product[] = [
  {
    id: 1,
    name: "NAA 4.5% SL",
    tag: "Plant Growth Regulator",
    color: "#4A6B8F",
    description: "Prevents flower and fruit drop in a wide range of crops.",
    longDescription: "NAA (Naphthalene Acetic Acid) 4.5% SL is a synthetic plant hormone in the auxin family. It is primarily used to prevent the premature shedding of flowers, squares, and bolls, thereby improving fruit set and overall yield. It is effective in crops like cotton, tomatoes, and mangoes.",
    features: [
        "Prevents flower and fruit drop",
        "Improves fruit set and retention",
        "Enhances overall crop yield",
        "Promotes root growth in cuttings",
        "Suitable for foliar application"
    ],
    usage: {
        tomato: "20-40 ml in 1000 L water per ha (at flowering and fruit set)",
        cotton: "222-444 ml in 1000 L water per ha (3 sprays from square formation)",
        mango: "15 ml formulation per 100 L water (pre-harvest spray)"
    },
    translationKey: "NAA",
    price: "Price on request",
    imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSEOzbC1ewJt0FDo4D6eFugAE9TOwtid_uve639m_hygRt6jr9Hv8HOdoERE4X38JD7lDkiq7oj_USjze5IH-K7qgFtT7OWVSe6ijPO8mNjiLG8qlYnh7cue30pqM2h3uY4kp-SRA&usqp=CAc"
  },
  {
    id: 2,
    name: "Abamectin 1.9% EC",
    tag: "Miticide / Insecticide",
    description: "Effective against mites and leaf miners in a variety of crops.",
    longDescription: "Abamectin 1.9% EC is a mixture of avermectins, producing toxic effects in insects and mites by stimulating the release of gamma-aminobutyric acid (GABA), an inhibitory neurotransmitter. It provides excellent control of spider mites and leaf miners in crops like roses, grapes, apples, and tomatoes.",
    features: [
        "Effective against red spider mites and leaf miners",
        "Acts through contact and stomach action",
        "Recommended for use on roses, grapes, apples, and tomatoes",
        "Provides long-lasting protection with a short waiting period",
        "Rapidly degrades on plant surfaces and in soil"
    ],
    usage: {
        rose: "0.025-0.05% solution in 5000 L water per ha (3 days waiting period)",
        grapes: "0.75 ml/L water in 500-1000 L water per ha (3 days waiting period)",
        apple: "0.05% solution, 6-7 L water per tree (7 days waiting period)",
        tomato: "450-600 ml in 500 L water per ha (3 days waiting period)"
    },
    translationKey: "Abamectin",
    color: "#2E7D32",
    price: "Price on request",
    imageUrl: "https://agribegri.com/_next/image?url=https%3A%2F%2Fdujjhct8zer0r.cloudfront.net%2Fmedia%2Fprod_image%2F9076641391771574284.webp&w=750&q=90"
  },
  {
    id: 3,
    name: "Acephate 75% SP",
    tag: "Systemic Insecticide",
    description: "Broad-spectrum systemic insecticide for sucking and chewing pests.",
    longDescription: "Acephate 75% SP is a soluble powder that acts as a systemic and contact insecticide. It is absorbed by leaves and roots, providing effective control against a wide range of pests including jassids, bollworms, aphids, and stem borers in crops like cotton, rice, and safflower.",
    features: [
        "Systemic action for long-lasting control",
        "Effective against both sucking and chewing insects",
        "Water-soluble for easy application",
        "Suitable for cotton, paddy, and safflower",
        "Reduces pest populations quickly"
    ],
    usage: {
        cotton_jassids: "292 g a.i./ha (390 g formulation) in 500-1000 L water (15 days waiting)",
        cotton_bollworms: "584 g a.i./ha (780 g formulation) in 500-1000 L water (15 days waiting)",
        safflower_aphids: "584 g a.i./ha (780 g formulation) in 500-1000 L water (15 days waiting)",
        rice_pests: "500-750 g a.i./ha (666-1000 g formulation) in 300-500 L water (15 days waiting)"
    },
    translationKey: "Acephate",
    color: "#1b4a2b",
    price: "480",
    imageUrl: "https://agribegri.com/_next/image?url=https%3A%2F%2Fdujjhct8zer0r.cloudfront.net%2Fmedia%2Fprod_image%2F8651509761758697120.webp&w=640&q=90"
  },
  {
    id: 4,
    name: "Acetamiprid 20% SP",
    tag: "Neonicotinoid",
    description: "Systemic insecticide for effective control of sap-feeding insects.",
    longDescription: "Acetamiprid 20% SP is a systemic, neonicotinoid insecticide that acts on the central nervous system of insects, causing paralysis and death. It is highly effective against aphids, jassids, thrips, and whiteflies in a variety of crops including cotton, cabbage, okra, chilli, and rice.",
    features: [
        "Powerful systemic and translaminar activity",
        "Controls a broad spectrum of sucking pests",
        "Quick knockdown effect",
        "Safe to beneficial insects when used as directed",
        "Compatible with most IPM programs"
    ],
    usage: {
        cotton_aphids_jassids: "10 g a.i./ha (50 g formulation) in 500-600 L water (15 days waiting)",
        cotton_whiteflies: "20 g a.i./ha (100 g formulation) in 500-600 L water (15 days waiting)",
        cabbage_aphids: "15 g a.i./ha (75 g formulation) in 500-600 L water (7 days waiting)",
        okra_aphids: "15 g a.i./ha (75 g formulation) in 500-600 L water (3 days waiting)",
        chilli_thrips: "10-20 g a.i./ha (50-100 g formulation) in 500-600 L water (3 days waiting)",
        rice_bph: "10-20 g a.i./ha (50-100 g formulation) in 500-600 L water (7 days waiting)"
    },
    translationKey: "Acetamiprid",
    color: "#556B2F",
    price: "Price on request",
    imageUrl: "https://agribegri.com/_next/image?url=https%3A%2F%2Fdujjhct8zer0r.cloudfront.net%2Fmedia%2Fprod_image%2F7512801971733205868.webp&w=750&q=90"
  },
  {
    id: 5,
    name: "Aluminum Phosphide 56%",
    tag: "Fumigant",
    description: "A highly effective fumigant for stored grain pest control.",
    longDescription: "Aluminum Phosphide 56% is a solid fumigant that reacts with moisture in the air to release phosphine gas. It is used to control a broad spectrum of stored grain pests like weevils, borers, and beetles in cereals, pulses, oilseeds, and spices, as well as for rodent control in burrows.",
    features: [
        "Highly effective against all stages of stored grain pests",
        "Penetrates deep into grain stacks",
        "Available in tablet and pouch formulations",
        "Kills insects without leaving residues on grain",
        "Also used for rodent burrow fumigation"
    ],
    usage: {
        cereals_pulses: "3 tablets (3g) per ton or 150g/100m³, exposure 5-7 days, aeration 48 hrs",
        oilseeds_spices: "3 tablets per ton or 225g/100m³, exposure 5 days, aeration 48 hrs",
        godowns: "14 tablets/1000m³ or 150g/100m³, exposure 72 hrs, aeration 24 hrs",
        rodent_burrows: "1 tablet per burrow"
    },
    translationKey: "AluminumPhosphide",
    color: "#8B4513",
    price: "Price on request",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAEWy7Yte9W0_GRp14iAufNxralI7sYg7Yjg&s"
  },
  {
    id: 6,
    name: "Brodifacoum 0.005% BB",
    tag: "Rodenticide",
    description: "A potent, single-feed anticoagulant rodenticide for field and premises.",
    longDescription: "Brodifacoum 0.005% BB is a powerful anticoagulant rodenticide. It works by inhibiting the synthesis of Vitamin K, essential for blood clotting, leading to the death of rodents from internal hemorrhaging. It is a single-feed bait, effective against a wide range of rats, bandicoots, and mice in agricultural, commercial, and residential settings.",
    features: [
        "Effective as a single-dose bait",
        "Controls a wide variety of rodent species",
        "Ready-to-use block formulation",
        "Ideal for use in and around buildings and fields",
        "Palatable bait matrix"
    ],
    usage: {
        field_rats: "One bait block (20g) per baiting station as single feed",
        residential: "Place in and around premises, cold storage, godowns, warehouses",
        burrow_baiting: "Place bait near active burrows"
    },
    translationKey: "Brodifacoum",
    color: "#4A2C2C",
    price: "Price on request",
    imageUrl: "https://www.pestfix.co.uk/images/product-images/BB063%20RodentFix%20BF%20Brodifacoum%2050%20Bait%20Blocks%20800.jpg"
  },
  {
    id: 7,
    name: "Chlorantraniliprole 18.5% SC",
    tag: "Anthranilic Diamide",
    description: "Targets lepidopteran pests by disrupting their muscle contraction.",
    longDescription: "Chlorantraniliprole 18.5% SC belongs to the anthranilic diamide class of insecticides. It works by activating the ryanodine receptors in insects, leading to uncontrolled muscle contraction, paralysis, and death. It is highly effective against stem borers, fruit borers, and caterpillars in crops like rice, cotton, and vegetables.",
    features: [
        "Excellent control of lepidopteran pests",
        "Acts on insect muscle systems, unique mode of action",
        "Long-lasting residual control",
        "Safe to mammals and beneficial insects",
        "Larvicidal and ovicidal properties"
    ],
    usage: {
        rice: "30 g a.i./ha (150 ml) in 500 L water (47 days waiting)",
        cabbage: "10 g a.i./ha (50 ml) in 500 L water (3 days waiting)",
        cotton: "30 g a.i./ha (150 ml) in 500 L water (9 days waiting)",
        tomato: "30 g a.i./ha (150 ml) in 500 L water (3 days waiting)",
        chilli: "30 g a.i./ha (150 ml) in 500 L water (3 days waiting)",
        brinjal: "40 g a.i./ha (200 ml) in 500-750 L water (22 days waiting)"
    },
    translationKey: "Chlorantraniliprole",
    color: "#2E4E5F",
    price: "Price on request",
    imageUrl: "https://agribegri.com/_next/image?url=https%3A%2F%2Fdujjhct8zer0r.cloudfront.net%2Fmedia%2Fprod_image%2F7512801971733205868.webp&w=750&q=90"
  },
  {
    id: 8,
    name: "Cypermethrin 10% EC",
    tag: "Pyrethroid",
    description: "A fast-acting, broad-spectrum insecticide for diverse crops.",
    longDescription: "Cypermethrin 10% EC is a synthetic pyrethroid insecticide that acts on the nervous system of insects, providing quick knockdown and kill. It is effective against a wide range of chewing and sucking pests, including bollworms, diamondback moths, fruit borers, and jassids in crops such as cotton, cabbage, okra, brinjal, and wheat.",
    features: [
        "Rapid knockdown and strong repellent action",
        "Broad-spectrum activity",
        "Effective against a wide range of field pests",
        "Stable in sunlight, providing good residual activity",
        "Suitable for integration with other pest management practices"
    ],
    usage: {
        cotton: "50-70 g a.i./ha (550-760 ml) in 150-1000 L water (7 days waiting)",
        cabbage: "60-70 g a.i./ha (650-760 ml) in 100-400 L water (7 days waiting)",
        okra: "50-70 g a.i./ha (550-760 ml) in 150-400 L water (3 days waiting)",
        brinjal: "50-70 g a.i./ha (550-760 ml) in 150-400 L water (3 days waiting)",
        wheat: "50 g a.i./ha (550 ml) in 500-800 L water (14 days waiting)"
    },
    translationKey: "Cypermethrin",
    color: "#D2691E",
    price: "Price on request",
    imageUrl: "https://static-cdn.pestobazaar.com/product-image/suqX5PYae4oH8azcPeHX.webp"
  },
  {
    id: 9,
    name: "Deltamethrin 2.8% EC",
    tag: "Pyrethroid",
    description: "High-potency insecticide for agriculture and public health.",
    longDescription: "Deltamethrin 2.8% EC is a highly potent synthetic pyrethroid insecticide. It disrupts the nervous system of insects, causing immediate paralysis. It is used in agriculture to control bollworms, leaf folders, thrips, and borers, and in public health for mosquito control. Its high activity means lower dosage rates are required.",
    features: [
        "Extremely high insecticidal activity",
        "Effective at very low doses",
        "Used for both crop protection and public health",
        "Provides rapid knockdown and good residual effect",
        "Effective against a wide range of insect pests"
    ],
    usage: {
        cotton: "12.5 g a.i./ha (500 ml) in 400-600 L water",
        tea_thrips: "3-4 g a.i./ha (120-150 ml) in 400-600 L water (3 days waiting)",
        okra: "10-15 g a.i./ha (400-600 ml) in 400-600 L water (1 day waiting)",
        chilli: "10-12.5 g a.i./ha (400-500 ml) in 400-600 L water (5 days waiting)",
        groundnut: "12.5 g a.i./ha (500 ml) in 400-600 L water (3 days waiting)",
        public_health_mosquito: "Thermal fogging 0.5 g a.i./ha or ULV 0.5 g a.i./ha"
    },
    translationKey: "Deltamethrin",
    color: "#B8860B",
    price: "Price on request",
    imageUrl: "https://static-cdn.pestobazaar.com/product-image/5EQp2BJFZW05x575HDzJ.webp"
  },
  {
    id: 10,
    name: "Imidacloprid 70% WG",
    tag: "Neonicotinoid",
    description: "A systemic insecticide for long-lasting control of sucking pests.",
    longDescription: "Imidacloprid 70% WG is a systemic insecticide from the neonicotinoid group. It is absorbed by plants and moves through the vascular system, providing long-lasting protection against sap-feeding insects. It is highly effective against jassids, aphids, thrips, and whiteflies in cotton, rice, vegetables, and other crops.",
    features: [
        "Powerful systemic action",
        "Provides long-term protection (up to several weeks)",
        "Highly effective against sucking insects",
        "Water-dispersible granule for easy mixing",
        "Reduced risk to the environment compared to broad-spectrum sprays"
    ],
    usage: {
        cotton: "21-24.5 g a.i./ha (30-35 g) in 375-500 L water (7 days waiting)",
        rice: "21-24.5 g a.i./ha (30-35 g) in 300-375 L water (7 days waiting)",
        okra: "21-24.5 g a.i./ha (30-35 g) in 300-375 L water (3 days waiting)",
        cucumber: "24.5 g a.i./ha (35 g) in 500 L water (5 days waiting)",
        tomato: "35 g a.i./ha (50 g) in 500 L water (5 days waiting)",
        potato: "63 g a.i./ha (90 g) in 500 L water (30 days waiting)"
    },
    translationKey: "Imidacloprid",
    color: "#2E5A8B",
    price: "Price on request",
    imageUrl: "https://cdn.shopify.com/s/files/1/0722/2059/files/admire-insecticide-file-20004.jpg?v=1747131488&width=640&format=webp"
  },
  {
    id: 11,
    name: "Thiamethoxam 25% WG",
    tag: "Neonicotinoid",
    description: "Systemic insecticide with rapid action for comprehensive crop protection.",
    longDescription: "Thiamethoxam 25% WG is a second-generation neonicotinoid insecticide with excellent systemic and translaminar activity. It works by interfering with nicotinic acetylcholine receptors in the insect nervous system. It is effective against a broad spectrum of sucking and some chewing pests in rice, cotton, vegetables, and mangoes.",
    features: [
        "Broad-spectrum control of sucking pests",
        "Excellent systemic and translaminar movement",
        "Rapid uptake by plants",
        "Long residual activity",
        "Can be applied as foliar spray, drench, or seed treatment"
    ],
    usage: {
        rice: "25 g a.i./ha (100 g) in 500-750 L water (14 days waiting)",
        cotton_jassid: "25 g a.i./ha (100 g) in 500-750 L water (21 days waiting)",
        cotton_whitefly: "50 g a.i./ha (200 g) in 500-750 L water (21 days waiting)",
        okra: "25 g a.i./ha (100 g) in 500-1000 L water (5 days waiting)",
        mango: "25 g a.i./ha (100 g) in 1000 L water (30 days waiting)",
        wheat: "12.5 g a.i./ha (50 g) in 500 L water (21 days waiting)"
    },
    translationKey: "Thiamethoxam",
    color: "#3A6B4B",
    price: "Price on request",
    imageUrl: "https://katyayanikrishidirect.com/cdn/shop/files/Thioxam75Emazar.jpg?v=1752907805&width=823"
  },
  {
    id: 12,
    name: "Acephate 50% + Imidacloprid 1.8% SP",
    tag: "Combination SP",
    description: "A powerful combination for controlling both sucking and borer pests.",
    longDescription: "This combination product harnesses the systemic and contact action of Imidacloprid with the broad-spectrum activity of Acephate. It provides a comprehensive solution for complex pest infestations, effectively managing jassids, aphids, thrips, whiteflies, and bollworms in crops like cotton, chilli, and paddy.",
    features: [
        "Dual mode of action for resistance management",
        "Controls a wide spectrum of sucking pests and bollworms",
        "Synergistic effect for enhanced pest control",
        "Ideal for crops with multiple pest complexes",
        "Water-soluble powder for easy application"
    ],
    usage: {
        cotton: "518 g a.i./ha (1000 g) in 500 L water (40 days waiting)",
        rice: "518 g a.i./ha (1000 g) in 500 L water",
        sugarcane: "1250+45 g a.i./ha (2500 ml) in 500 L water (123 days waiting)",
        chilli: "518 g a.i./ha (1000 g) in 500 L water (3 days waiting)"
    },
    translationKey: "AcephateImida",
    color: "#4A5D3A",
    price: "Price on request",
    imageUrl: "https://agribegri.com/_next/image?url=https%3A%2F%2Fdujjhct8zer0r.cloudfront.net%2Fmedia%2Fprod_image%2F7512801971733205868.webp&w=750&q=90"
  },
  {
    id: 13,
    name: "Chlorantraniliprole 9.3% + Lambda-cyhalothrin 4.6% ZC",
    tag: "Combination ZC",
    description: "A potent mix of diamide and pyrethroid for rapid and residual control.",
    longDescription: "This combination formulation contains Chlorantraniliprole (a ryanodine receptor modulator) and Lambda-cyhalothrin (a sodium channel modulator). It provides both quick knockdown and long-lasting residual control of a wide range of pests including fruit borers, bollworms, leaf folders, jassids, and beetles in crops like pigeon pea, cotton, brinjal, and maize.",
    features: [
        "Two powerful modes of action",
        "Provides rapid knockdown (Lambda-cyhalothrin) and long residual (Chlorantraniliprole)",
        "Broad-spectrum control of lepidopteran and sucking pests",
        "Effective resistance management tool",
        "Protects yield and quality"
    ],
    usage: {
        pigeon_pea: "30 g a.i./ha (200 ml) in 500 L water (18 days waiting)",
        cotton: "37.5 g a.i./ha (250 ml) in 500 L water (20 days waiting)",
        brinjal: "28 g a.i./ha (200 ml) in 500 L water (5 days waiting)",
        okra: "28 g a.i./ha (200 ml) in 500 L water (3 days waiting)",
        rice: "28-35 g a.i./ha (200-250 ml) in 500 L water (53 days waiting)",
        soybean: "28 g a.i./ha (200 ml) in 500 L water (41 days waiting)",
        maize: "35 g a.i./ha (250 ml) in 500 L water (36 days waiting)"
    },
    translationKey: "ChlLambda",
    color: "#5A3D2E",
    price: "Price on request",
    imageUrl: "https://agribegri.com/_next/image?url=https%3A%2F%2Fdujjhct8zer0r.cloudfront.net%2Fmedia%2Fprod_image%2F9076641391771574284.webp&w=750&q=90"
  },
  {
    id: 14,
    name: "Lambda-cyhalothrin 9.7% CS",
    tag: "Public Health Insecticide",
    description: "A microencapsulated formulation for effective mosquito control.",
    longDescription: "Lambda-cyhalothrin 9.7% CS is a public health insecticide formulated for indoor residual spraying (IRS). Its microencapsulation technology provides a safer and longer-lasting residual effect on various wall surfaces. It is specifically recommended for controlling mosquitoes that transmit malaria, dengue, and other vector-borne diseases.",
    features: [
        "Microencapsulated for enhanced safety and residual life",
        "Used for Indoor Residual Spraying (IRS)",
        "Effective against Anopheles, Aedes, and Culex mosquitoes",
        "Long-lasting efficacy on porous and non-porous surfaces",
        "Approved for public health programs"
    ],
    usage: {
        malaria_control: "25 mg a.i./sq.m (12.5 ml/500 sq.m) in 10 L water",
        moderate_infestation: "20 mg a.i./sq.m (4 ml/L water) spray solution 50 ml/sq.m",
        high_infestation: "25 mg a.i./sq.m (5 ml/L water) spray solution 50 ml/sq.m"
    },
    translationKey: "LambdaCS",
    color: "#2E5A8B",
    price: "Price on request",
    imageUrl: "https://agribegri.com/_next/image?url=https%3A%2F%2Fdujjhct8zer0r.cloudfront.net%2Fmedia%2Fprod_image%2F7512801971733205868.webp&w=750&q=90"
  },
  {
    id: 15,
    name: "Temephos 1% GR",
    tag: "Larvicide",
    description: "A larvicide for controlling mosquito breeding in water bodies.",
    longDescription: "Temephos 1% GR is an organophosphate larvicide used in public health programs to control mosquito larvae. It is applied to breeding habitats such as stagnant water, ponds, drains, and containers to prevent the emergence of adult mosquitoes. It is highly effective against Aedes, Anopheles, and Culex species.",
    features: [
        "Specifically targets mosquito larvae",
        "Prevents adult mosquito emergence",
        "Ideal for use in drinking water storage containers (at recommended doses)",
        "Available in easy-to-apply granule form",
        "An essential tool in Integrated Vector Management (IVM)"
    ],
    usage: {
        highly_polluted: "200-500 g a.i./ha (20-50 kg/ha) for drains, cesspits",
        moderately_polluted: "100-200 g a.i./ha (10-20 kg/ha) for marshes, swamps",
        clean_water: "50-100 g a.i./ha (5-10 kg/ha) for ponds, lakes",
        cyclops_control: "0.5-1.0 g a.i. (5-10 g) for ponds, step wells"
    },
    translationKey: "Temephos",
    color: "#4A6B5A",
    price: "Price on request",
    imageUrl: "https://agribegri.com/_next/image?url=https%3A%2F%2Fdujjhct8zer0r.cloudfront.net%2Fmedia%2Fprod_image%2F9076641391771574284.webp&w=750&q=90"
  },
  {
    id: 16,
    name: "Transfluthrin 0.88% Liquid Vaporizer",
    tag: "Household Insecticide",
    description: "A ready-to-use liquid vaporizer for mosquito-free homes.",
    longDescription: "This is a ready-to-use household insecticide in a liquid vaporizer format. It contains Transfluthrin, a fast-acting pyrethroid that effectively repels and kills mosquitoes (Aedes, Anopheles, Culex) and houseflies. It provides a convenient and continuous protection system for indoor use.",
    features: [
        "Ready-to-use liquid vaporizer",
        "Provides continuous protection for up to 30-60 nights",
        "Effectively controls and repels mosquitoes",
        "Odorless and non-staining",
        "Ideal for bedrooms and living areas"
    ],
    usage: {
        indoor: "Use with standard liquid vaporizer machine, one refill provides 30-45 nights protection",
        area: "Effective for rooms up to 300-400 sq.ft"
    },
    translationKey: "TransfluthrinLV",
    color: "#DAA520",
    price: "Price on request",
    imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRUBB5JmYhvnXr_gplfOf2zWSnhyhPpNkRCQCPHDxQaIMiuBkZs3J9SZjOlUdlZr_BzYyCPOdbcfsyBBw5dWYxmI38TTCWXC6izYdnUb05Utj6ryQZ6pZW7ig"
  },
  {
    id: 17,
    name: "Prallethrin 0.65% Liquid Vaporizer",
    tag: "Household Insecticide",
    description: "A fast-acting liquid vaporizer for immediate mosquito protection.",
    longDescription: "This liquid vaporizer contains Prallethrin, a synthetic pyrethroid known for its rapid knockdown effect against mosquitoes. It is highly effective in eliminating mosquitoes quickly and providing a comfortable environment. It is safe for use in homes when used as directed.",
    features: [
        "Fast-acting formula for quick knockdown",
        "Effective against mosquitoes and other flying insects",
        "Provides continuous protection",
        "Easy to use with standard liquid vaporizer devices",
        "Pleasant fragrance for a comfortable atmosphere"
    ],
    usage: {
        indoor: "Use with standard liquid vaporizer machine, one refill provides 30-45 nights protection",
        area: "Effective for rooms up to 300-400 sq.ft"
    },
    translationKey: "PrallethrinLV",
    color: "#FFD700",
    price: "Price on request",
    imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRz2x6pa4AN34GFJLpAqmJ7Kj3vN4S8auBCO-L5H-9nRU7hp0hh6luOFcRKrQ_MDdAnlPFi2H8McIxZgC-njMI0jal6UF3W2JeWP5K2sfKc4dFlpCIjC3ElG_M62QTjhH75h-pl1oE&usqp=CAc"
  },
  {
    id: 18,
    name: "Rupiya Kuber",
    tag: "Liquid Manure Supplement",
    description: "A natural liquid manure supplement providing balanced potassium, carbon, and magnesium to the crop.",
    longDescription: "It's a natural liquid manure supplement which provides balanced amounts of potassium, carbon and magnesium to the crop. Increases productivity and quality of crops by enhancing the process of photosynthesis and pollen germination.",
    features: [
        "Increases productivity and quality of crops",
        "Enhances photosynthesis and pollen germination",
        "Provides natural micronutrition to the crop",
        "Helps in fruit and flower development"
    ],
    usage: {
        foliar_spray: "5-10 ml per liter of water",
        drip_irrigation: "10-15 liters per acre"
    },
    translationKey: "RupiyaKuber",
    color: "#B8860B",
    price: "Price on request",
    imageUrl: "https://vau-files.s3.ap-south-1.amazonaws.com/1739818828552_Rupiya_Humic-removebg-preview.png"
  }
];
