import { ApiCategory } from "@/domain";
import { api } from "../api";

export async function loadCategories() {
	const { data: _categories } = await api.get<ApiCategory[]>("/categories");

	return _categories;
}
