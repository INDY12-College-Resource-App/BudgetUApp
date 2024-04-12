// types.ts I looked this up, it'll prevent typescript infering errors
export type RootStackParamList = {
  ResourcesHome: undefined;
  FinancialAdvice: undefined;
  BudgetingAdvice: undefined;
};

// Creating a type of FinancialResource that fits the strapi data.
export type FinancialResource = {
  id: string;
  attributes: {
    Title: string;
    Description: string;
    Link: string;
    Category: string;
   
    SitePicture: {
      data: {
        attributes: {
          formats: {
            thumbnail: {
              url: string;
              FullImage: string;
            }
          }
        }
      }
    };
  };
};

export type FinancialResourcesResponse = {
  data: FinancialResource[];
};
