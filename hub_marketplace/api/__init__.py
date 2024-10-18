import frappe
from hub_marketplace.api.master_services import masterServices
from hub_marketplace.api.seller_services import sellerServices


@frappe.whitelist(allow_guest=True)
def handle_hub_marketplace_request():
    url_parts = frappe.request.path[1:].split("/",3)
    request = url_parts[-1] if url_parts[-1][0] != "/" else url_parts[-1][1:]
    data = frappe._dict(frappe.local.form_dict)
    data.pop("cmd")
    try:
        master_services = masterServices(data)
        seller_services = sellerServices(data)
        if hasattr(master_services, request):
            return getattr(master_services, request)()
        elif hasattr(seller_services, request):
            return getattr(seller_services, request)()
        else:
            frappe.throw("Invalid Request")
    except Exception as e:
        raise frappe.ValidationError(e)