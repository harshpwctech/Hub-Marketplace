import frappe
from hub_marketplace.api.master import masterServices

MASTER_SERVICES = ["get_categories", "get_top_items_sellers", "get_items", "get_item", "get_seller"]

@frappe.whitelist(allow_guest=True)
def handle_hub_marketplace_request():
    url_parts = frappe.request.path[1:].split("/",3)
    request = url_parts[-1] if url_parts[-1][0] != "/" else url_parts[-1][1:]
    data = frappe._dict(frappe.local.form_dict)
    if request in MASTER_SERVICES:
        return masterServices(request=request, data=data).handle()
    else:
        frappe.throw("Invalid Request")