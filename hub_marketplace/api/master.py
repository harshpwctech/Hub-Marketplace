import frappe

def get_categories():
    response = []
    categories = frappe.get_all("Hub Item Category")
    for c in categories:
        if frappe.db.exists("Hub Seller Item", {"category": c.name}):
            response.append(frappe.get_cached_doc("Hub Item Category", c.name))
    return response

def get_top_items_sellers(category):
    response = {
        "sellers": [],
        "products": []
    }
    seller_filters = [
        ["Hub Item Category Detail","category","=",category],
        ["Hub Seller", "logo", "is", "set"]
    ]
    seller_fields = ["name", "seller_name", "brand", "logo"]
    sellers = frappe.get_all("Hub Seller", fields= seller_fields, filters=seller_filters, limit_page_length=15)
    if len(sellers):
        sellers_for_item_filters = [s.name for s in sellers]
        item_filters = [
            ["Hub Seller Item","category","=",category],
            ["Hub Seller Item","hub_seller","in",sellers_for_item_filters],
            ["Hub Seller Item","image","is","set"],
        ]
        item_fields = ["name", "hub_seller", "seller_name", "item_name", "offered_price", "rating", "image"]
        items = frappe.get_all("Hub Seller Item", filters=item_filters, limit_page_length=8, fields=item_fields)
        if len(items):
            response["sellers"] = sellers
            response["products"] = items
    
    return response

def get_items(**kwargs):
    item_filters = [
        ["Hub Seller Item","image","is","set"]
        ]
    item_fields = ["name", "hub_seller", "seller_name", "item_name", "offered_price", "rating", "image"]
    filters = kwargs.get("filters", {})
    if filters:
        for k,v in filters.items():
            if isinstance(v, str):
                item_filters.append(["Hub Seller Item",k,"=",v])
            elif isinstance(v, list):
                item_filters.append(["Hub Seller Item",k,"in",v])
    else:
        return frappe.throw("Filters are mandatory")
    items = frappe.get_all("Hub Seller Item", filters=item_filters, fields=item_fields)
    return items


class masterServices:
    def __init__(self, request, data):
        self.request = request
        data.pop("cmd")
        self.data = frappe._dict(data)
    
    def handle(self):
        if self.request == "get_categories":
            return get_categories()
        elif self.request == "get_top_items_sellers":
            category = self.data.category
            return get_top_items_sellers(category)
        elif self.request == "get_items":
            kwargs = self.data
            return get_items(**kwargs)
        elif self.request == "get_seller":
            hub_seller = self.data.hub_seller
            return frappe.get_cached_doc("Hub Seller", hub_seller)
        elif self.request == "get_item":
            name = self.data.name
            return frappe.get_cached_doc("Hub Seller Item", name)
        elif self.request == "get_sub_category":
            sub_category = self.data.sub_category
            return frappe.get_cached_doc("Hub Item Sub Category", sub_category)
    