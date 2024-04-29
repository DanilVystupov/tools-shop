export type ICard = {
    id:                 string;
    name:               string;
    code:               string | null;
    price: {
      old_price:        number | null;
      current_price:    number;
    };
    image: {
      url:              string;
    };
    material:           number;
    isSale:             boolean;
};

export type IOption = {
    id:                 number;
    name:               string
}

export interface IState {
    cards:              ICard[];
    title:              string;
    materials:          IOption[];
    sortingOptions:     IOption[]
}