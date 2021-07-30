import { SearchFields } from "./search-fields";

export interface ConfigParams {

    page: number;
    limit: number;
    search?: string;
    fields?: SearchFields;
}
