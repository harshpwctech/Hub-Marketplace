import frappe

def register_buyer(email, first_name, last_name):
	frappe.utils.validate_email_address(email, True)

	current_user = frappe.session.user
	frappe.set_user("Administrator")

	email = email.strip().lower()

	if not frappe.db.exists("User", email):
		user = frappe.get_doc(
			{
				"doctype": "User",
				"email": email,
				"first_name": first_name,
				"last_name": last_name,
				"send_welcome_email": "0"
			}
		).insert()
		user.add_roles("Hub Buyer")

		frappe.set_user(current_user)
	else:
		frappe.set_user(current_user)
		frappe.throw("User already exists, please try loggin in using this email")

def in_wishlist(user, item):
	if frappe.db.exists("Hub Wishlist", {"user": user}):
		hub_wishlist = frappe.db.get_value("Hub Wishlist", {"user": user})
		if frappe.db.exists("Hub Wishlist Item", {"item": item, "parent": hub_wishlist, "parenttype": "Hub Wishlist"}):
			return True
		else:
			return False
	else:
		return False

def add_to_wishlist(user, item):
	if frappe.db.exists("Hub Wishlist", {"user": user}):
		hub_wishlist = frappe.get_last_doc("Hub Wishlist", {"user": user})
		hub_wishlist.append("wishlist_items", {"item": item})
		hub_wishlist.save()
	else:
		hub_wishlist = frappe.new_doc("Hub Wishlist")
		hub_wishlist.user = user
		hub_wishlist.append("wishlist_items", {"item": item})
		hub_wishlist.insert()
	return

def remove_from_wishlist(user, item):
	hub_wishlist = frappe.get_last_doc("Hub Wishlist", {"user": user})
	for idx, i in enumerate(hub_wishlist.wishlist_items):
		if i.item == item:
			hub_wishlist.wishlist_items.pop(idx)
			break
	if not len(hub_wishlist.wishlist_items):
		hub_wishlist.delete()
	else:
		hub_wishlist.save()
	return

class buyerServices:
	def __init__(self, data):
		self.data = frappe._dict(data)
	
	def register_buyer(self):
		return register_buyer(self.data)
	
	def in_wishlist(self):
		user = self.data.user
		item_name = self.data.item_name
		return in_wishlist(user, item_name)
	
	def add_to_wishlist(self):
		user = self.data.user
		item_name = self.data.item_name
		return add_to_wishlist(user, item_name)

	def remove_from_wishlist(self):
		user = self.data.user
		item_name = self.data.item_name
		return remove_from_wishlist(user, item_name)

