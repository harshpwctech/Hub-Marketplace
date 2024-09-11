import frappe

def register_seller(seller_data):
    return

class sellerServices:
    def __init__(self, request, data):
        self.request = request
        data.pop("cmd")
        self.data = frappe._dict(data)
    
    def handle(self):
        if self.request == "register_seller":
            return register_seller(self.data)