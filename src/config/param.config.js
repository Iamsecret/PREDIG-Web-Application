module.exports = [
  {
    fileName: "kinetic_parameters.txt",
    displayName: "Kinetic parameters",

    parameters: [
      {
        name: "EG_KCAT",
        displayName: "EG Kcat",
        tooltip:
          "Endoglucanase catalytic constant. \
          It represents the number of molecules of substrate transformed per unit of time. \
          In 1/seconds.  \
          Ranging from 0.001 to 1,000.",
        unit: "1/s",
        defaultValue: 0.01,
        errorText: "Value should be between 0.001 and 1,000.",
        validationFunction: (value) => {
          return value >= 0.001 && value <= 1000;
        },
        isUsedForFitting: true,
        index: 0,
      },
      {
        name: "EG_KM",
        displayName: "EG Km",
        tooltip:
          "Endoglucanase Michaelis-Menten constant.\
          It represents the substrate concentration for which the reaction velocity is half of its maximum under substrate saturation. \
          In millimolar. \
          Ranging from 0.001 to 1,000.",
        unit: "mM",
        defaultValue: 0.95,
        errorText: "Value should be between 0.001 and 1,000.",
        validationFunction: (value) => {
          return value >= 0.001 && value <= 1000;
        },
        isUsedForFitting: true,
        index: 1,
      },
      {
        name: "BGL_KCAT",
        displayName: "BGL Kcat",
        tooltip:
          "β-glucosidase catalytic constant. \
          It represents the number of molecules of substrate transformed per unit of time. \
          In 1/seconds.  \
          Ranging from 0.001 to 1,000.",
        unit: "1/s",
        defaultValue: 300,
        errorText: "Value should be between 0.001 and 1,000.",
        validationFunction: (value) => {
          return value >= 0.001 && value <= 1000;
        },
        isUsedForFitting: true,
        index: 3,
      },
      {
        name: "BGL_KM",
        displayName: "BGL Km",
        tooltip:
          "β-glucosidase Michaelis-Menten constant.\
          It represents the substrate concentration for which the reaction velocity is half of its maximum under substrate saturation. \
          In millimolar. \
          Ranging from 0.001 to 1,000.",
        unit: "mM",
        defaultValue: 0.021,
        errorText: "Value should be between 0.001 and 1,000.",
        validationFunction: (value) => {
          return value >= 0.001 && value <= 1000;
        },
        isUsedForFitting: true,
        index: 4,
      },
      {
        name: "XYL_KCAT",
        displayName: "XYL Kcat",
        tooltip:
          "Xylanase catalytic constant. \
          It represents the number of molecules of substrate transformed per unit of time. \
          In 1/seconds.  \
          Ranging from 0.001 to 1,000.",
        unit: "1/s",
        defaultValue: 80,
        errorText: "Value should be between 0.001 and 1,000.",
        validationFunction: (value) => {
          return value >= 0.001 && value <= 1000;
        },
        isUsedForFitting: true,
        index: 5,
      },
      {
        name: "XYL_KM",
        displayName: "XYL Km",
        tooltip:
          "Xylanase Michaelis-Menten constant.\
          It represents the substrate concentration for which the reaction velocity is half of its maximum under substrate saturation. \
          In millimolar. \
          Ranging from 0.001 to 1,000.",
        unit: "mM",
        defaultValue: 0.073,
        errorText: "Value should be between 0.001 and 1,000.",
        validationFunction: (value) => {
          return value >= 0.001 && value <= 1000;
        },
        isUsedForFitting: true,
        index: 6,
      },
      {
        name: "CBH_KCAT",
        displayName: "CBH Kcat",
        tooltip:
          "Cellobiohydrolase catalytic constant. \
          It represents the number of CBH enzymes attaching to the free end of a cellulose polymer per unit of time. \
          In 1/seconds.  \
          Ranging from 0.001 to 1,000.",
        unit: "1/s",
        defaultValue: 0.104,
        errorText: "Value should be between 0.001 and 1,000.",
        validationFunction: (value) => {
          return value >= 0.001 && value <= 1000;
        },
        isUsedForFitting: true,
        index: 8,
      },
      {
        name: "CBH_KM",
        displayName: "CBH Km",
        tooltip:
          "Cellobiohydrolase Michaelis-Menten constant.\
          It represents the substrate concentration for which the attachment reaction velocity is half of its maximum under substrate saturation. \
          In millimolar. \
          Ranging from 0.001 to 1,000.",
        unit: "mM",
        defaultValue: 0.02,
        errorText: "Value should be between 0.001 and 1,000.",
        validationFunction: (value) => {
          return value >= 0.001 && value <= 1000;
        },
        isUsedForFitting: true,
        index: 9,
      },
      {
        name: "CBH_RATE",
        displayName: "CBH processive reaction rate",
        tooltip:
          "Cellobiohydrolase processive rate of reaction.\
          It represents the number of cellobiose molecules released per unit of time per attached CBH enzyme, as a cellobiose molecule is released at each processive step.  \
          In reactions per hour. \
          Ranging from 10 to 10,000.",
        unit: "reactions/h",
        defaultValue: 2000,
        errorText: "Value should be between 10 and 10,000.",
        validationFunction: (value) => {
          return value >= 10 && value <= 10000;
        },
        isUsedForFitting: true,
        index: 2,
      },
      {
        name: "L_A",
        displayName: "Number of monolignols",
        tooltip:
          "Number of monolignols.\
          It represents the number of monolignols which bind to a single enzyme molecule. \
          No Unit. \
          Ranging from 150 to 350.\
          The lower is the value of that parameter, the more enzymes will adhere to lignin and get de-activated.",
        unit: "dimensionless number (integer)",
        defaultValue: 350,
        errorText: "Value should be between 150 and 350.",
        validationFunction: (value) => {
          return value >= 150 && value <= 350;
        },
        isUsedForFitting: true,
        index: 7,
      },
      {
        name: "INHIB_C_EG",
        displayName: "Inhibition cellobiose EG",
        tooltip:
          "Inhibition factor, binding affinity of cellobiose to endoglucanase.\
          It represents the fraction of product (cellobiose) molecules that bind to the active site of the enzyme (EG). \
          No Unit. \
          Ranging from 0 to 1.",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.25,
        errorText: "Value should be between 0 and 1.",
        validationFunction: (value) => {
          return value >= 0 && value <= 1;
        },
        isUsedForFitting: true,
        index: 10,
      },
      {
        name: "INHIB_G_EG",
        displayName: "Inhibition glucose EG",
        tooltip:
          "Inhibition factor, binding affinity of glucose to endoglucanase.\
          It represents the fraction of product (glucose) molecules that bind to the active site of the enzyme (EG). \
          No Unit. \
          Ranging from 0 to 1.",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.25,
        errorText: "Value should be between 0 and 1.",
        validationFunction: (value) => {
          return value >= 0 && value <= 1;
        },
        isUsedForFitting: true,
        index: 12,
      },
      {
        name: "INHIB_C_CBH",
        displayName: "Inhibition cellobiose CBH",
        tooltip:
          "Inhibition factor, binding affinity of cellobiose to cellobiohydrolase.\
          It represents the fraction of product (cellobiose) molecules that bind to the active site of the enzyme (CBH). \
          No Unit. \
          Ranging from 0 to 1.",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.5,
        errorText: "Value should be between 0 and 1.",
        validationFunction: (value) => {
          return value >= 0 && value <= 1;
        },
        isUsedForFitting: true,
        index: 11,
      },
      {
        name: "INHIB_G_CBH",
        displayName: "Inhibition glucose CBH",
        tooltip:
          "Inhibition factor, binding affinity of glucose to cellobiohydrolase.\
          It represents the fraction of product (glucose) molecules that bind to the active site of the enzyme (CBH). \
          No Unit. \
          Ranging from 0 to 1.",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.5,
        errorText: "Value should be between 0 and 1.",
        validationFunction: (value) => {
          return value >= 0 && value <= 1;
        },
        isUsedForFitting: true,
        index: 13,
      },
      {
        name: "INHIB_G_BGL",
        displayName: "Inhibition glucose BGL",
        tooltip:
          "Inhibition factor, binding affinity of glucose to β-glucosidase.\
          It represents the fraction of product (glucose) molecules that bind to the active site of the enzyme (BGL). \
          No Unit. \
          Ranging from 0 to 1.",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.5,
        errorText: "Value should be between 0 and 1.",
        validationFunction: (value) => {
          return value >= 0 && value <= 1;
        },
        isUsedForFitting: true,
        index: 14,
      },
      {
        name: "R_CA_C",
        displayName: "Digestibility ratio cellulose",
        tooltip:
          "It represents the ratio between digestibility of crystalline and amorphous cellulose.\
          The lower the value, the harder it is to digest crystalline bonds as compared to their amorphous counterparts. A value of 0 means the crystalline bonds are absolutely indigestible, while a value of 1 means both crystalline and amorphous bonds are indistinguishable, and their digestibility is set to the value of amorphous bonds. A value of 0.1, makes crystalline bonds 10 times harder to digest while a value of 0.01, makes crystalline bonds 100 times harder to digest compared to their amorphous counterparts.\
          No Unit. \
          Ranging from 0.00001 to 1.",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.05,
        errorText: "Value should be between 0.00001 and 1.",
        validationFunction: (value) => {
          return value >= 0.00001 && value <= 1;
        },
        isUsedForFitting: true,
        index: 15,
      },
      {
        name: "R_CA_H",
        displayName: "Digestibility ratio hemicellulose",
        tooltip:
          "It represents the ratio between digestibility of crystalline and amorphous hemicellulose.\
          The lower the value, the harder it is to digest crystalline bonds as compared to their amorphous counterparts. A value of 0 means the crystalline bonds are absolutely indigestible, while a value of 1 means both crystalline and amorphous bonds are indistinguishable, and their digestibility is set to the value of amorphous bonds. A value of 0.1, makes crystalline bonds 10 times harder to digest while a value of 0.01, makes crystalline bonds 100 times harder to digest compared to their amorphous counterparts.\
          No Unit. \
          Ranging from 0.00001 to 1.",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.01,
        errorText: "Value should be between 0.00001 and 1.",
        validationFunction: (value) => {
          return value >= 0.00001 && value <= 1;
        },
        isUsedForFitting: true,
        index: 16,
      },
    ],
  },
  {
    fileName: "initial_configuration_parameters.txt",
    displayName: "Initial configuration parameters",
    substrate: {
      name: "SUB",
      displayName: "Substrate",
      unit: "dimensionless number (categorical variable)",
      defaultValue: "5",
      validationFunction: (value) => {
        return true;
      },
      index: 0,
    },
    parameters: [
      {
        name: "EG_PCT",
        displayName: "EG percentage",
        tooltip:
          "Endoglucanase percentage.\
          It represents the relative fraction of endoglucanase in the enzyme cocktail. \
          No unit. \
          Ranging from 0 to 1.",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.135,
        errorText:
          "Value should be between 0 and 1. Percentages must add up to 1.",
        validationFunction: (value) => {
          return value >= 0 && value <= 1;
        },
        isUsedForFitting: false,
        index: 1,
      },
      {
        name: "CBH_PCT",
        displayName: "CBH percentage",
        tooltip:
          "Cellobiohydrolase percentage.\
          It represents the relative fraction of cellobiohydrolase in the enzyme cocktail. \
          No unit. \
          Ranging from 0 to 1.",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.353,
        errorText:
          "Value should be between 0 and 1. Percentages must add up to 1.",
        validationFunction: (value) => {
          return value >= 0 && value <= 1;
        },
        isUsedForFitting: false,
        index: 2,
      },
      {
        name: "BGL_PCT",
        displayName: "BGL percentage",
        tooltip:
          "β-glucosidase percentage.\
          It represents the relative fraction of β-glucosidase in the enzyme cocktail. \
          No unit. \
          Ranging from 0 to 1.",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.1,
        errorText:
          "Value should be between 0 and 1. Percentages must add up to 1.",
        validationFunction: (value) => {
          return value >= 0 && value <= 1;
        },
        isUsedForFitting: false,
        index: 3,
      },
      {
        name: "XYL_PCT",
        displayName: "XYL percentage",
        tooltip:
          "Xylanase percentage.\
          It represents the relative fraction of xylanase in the enzyme cocktail. \
          No unit. \
          Ranging from 0 to 1.",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.412,
        errorText:
          "Value should be between 0 and 1. Percentages must add up to 1.",
        validationFunction: (value) => {
          return value >= 0 && value <= 1;
        },
        isUsedForFitting: false,
        index: 4,
      },
      {
        name: "PER_C",
        displayName: "Percentage of cellulose",
        tooltip:
          "Percentage of cellulose within the microfibril.\
          It represents the fraction of cellulose in the composition of the substrate. \
          No unit. \
        Ranging from 0.1 to 1.",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.637,
        errorText:
          "Value should be between 0.1 and 1. Percentages of cellulose, hemicellulose, and lignin must sum-up to 1.",
        validationFunction: (value) => {
          return value >= 0.1 && value <= 1;
        },
        isUsedForFitting: false,
        index: 9,
      },
      {
        name: "PER_H",
        displayName: "Percentage of hemicellulose",
        tooltip:
          "Percentage of hemicellulose within the microfibril.\
          It represents the fraction of hemicellulose in the composition of the substrate. \
          No unit. \
          Ranging from 0 to 0.99. ",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.053,
        errorText:
          "Value should be between 0 and 0.99. Percentages of cellulose, hemicellulose, and lignin must sum-up to 1.",
        validationFunction: (value) => {
          return value >= 0 && value <= 0.99;
        },
        isUsedForFitting: false,
        index: 10,
      },
      {
        name: "PER_L",
        displayName: "Percentage of lignin",
        tooltip:
          "Percentage of lignin within the microfibril.\
          It represents the fraction of lignin in the composition of the substrate. \
          No unit. \
          Ranging from 0 to 0.99.",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.31,
        errorText:
          "Value should be between 0 and 0.99. Percentages of cellulose, hemicellulose, and lignin must sum-up to 1.",
        validationFunction: (value) => {
          return value >= 0 && value <= 0.99;
        },
        isUsedForFitting: false,
        index: 11,
      },
      {
        name: "PER_C_C",
        displayName: "Percentage of crystalline cellulose",
        tooltip:
          "Percentage of crystalline cellulose.\
          It represents the fraction of crystalline cellulose bonds over the total number of cellulose bonds. \
          No unit. \
          Ranging from 0 to 1.",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.02,
        errorText:
          "Value should be between 0 and 1. The percentage of crystalline hemicellulose cannot be more than that of cellulose.",
        validationFunction: (value) => {
          return value >= 0 && value <= 1;
        },
        isUsedForFitting: true,
        index: 13,
      },
      {
        name: "PER_C_H",
        displayName: "Percentage of crystalline hemicellulose",
        tooltip:
          "Percentage of crystalline hemicellulose.\
          It represents the fraction of crystalline hemicellulose bonds over the total number of hemicellulose bonds. \
          No unit. \
          Ranging from 0 to 1.",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.02,
        errorText:
          "Value should be between 0 and 1. The percentage of crystalline hemicellulose cannot be more than that of cellulose.",
        validationFunction: (value) => {
          return value >= 0 && value <= 1;
        },
        isUsedForFitting: true,
        index: 14,
      },
      {
        name: "MEAN_DEF",
        displayName: "Fraction of defects",
        tooltip:
          "Fraction of defects.\
          It represents the fraction of amorphous bonds forming defects on both the outermost layer of the crystalline cellulose core and on the adjacent layer of hemicellulose. \
          No unit. \
          Ranging from 0 to 0.5.",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.01,
        errorText: "Value should be between 0 and 0.5.",
        validationFunction: (value) => {
          return value >= 0 && value <= 0.5;
        },
        isUsedForFitting: true,
        index: 15,
      },
      {
        name: "NR_DEF",
        displayName: "Fraction of defective outer polymers",
        tooltip:
          "Fraction of defective outer polymers.\
          It represents the fraction of the outermost cellulose polymers which have defects, thereby also setting that of the adjacent defective hemicellulose ones. \
          No unit. \
          Ranging from 0 to 1.",
        unit: "dimensionless number (decimal)",
        defaultValue: 0.5,
        errorText: "Value should be between 0 and 1.",
        validationFunction: (value) => {
          return value >= 0 && value <= 1;
        },
        isUsedForFitting: true,
        index: 16,
      },
    ],
  },
];
