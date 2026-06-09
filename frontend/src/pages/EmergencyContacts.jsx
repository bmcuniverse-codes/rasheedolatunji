import { useEffect, useState } from "react";
import { Phone, Plus, Trash2, Users } from "lucide-react";

import BottomNav from "../components/BottomNav";

import {
  addContact,
  deleteContact,
  getContacts,
} from "../services/contactService";

function EmergencyContacts() {
  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    relationship: "",
    phone: "",
  });

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to load contacts."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addContact(form);

      setForm({
        name: "",
        relationship: "",
        phone: "",
      });

      fetchContacts();
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Could not add contact."
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      fetchContacts();
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Could not delete contact."
      );
    }
  };

  return (
    <div className="min-h-screen bg-dark px-5 pt-6 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-danger/20 flex items-center justify-center">
            <Users className="text-danger" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Emergency Contacts
            </h1>

            <p className="text-gray-400 text-sm">
              Manage trusted emergency contacts.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-card border border-gray-800 rounded-3xl p-5"
        >
          <label className="text-sm text-gray-300">
            Full Name
          </label>

          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full mt-2 mb-4 bg-dark border border-gray-700 rounded-2xl px-4 py-3 outline-none"
          />

          <label className="text-sm text-gray-300">
            Relationship
          </label>

          <select
            required
            name="relationship"
            value={form.relationship}
            onChange={handleChange}
            className="w-full mt-2 mb-4 bg-dark border border-gray-700 rounded-2xl px-4 py-3 outline-none"
          >
            <option value="">
              Select relationship
            </option>

            <option>Father</option>
            <option>Mother</option>
            <option>Guardian</option>
            <option>Friend</option>
            <option>Security Contact</option>
          </select>

          <label className="text-sm text-gray-300">
            Phone Number
          </label>

          <input
            required
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="08012345678"
            className="w-full mt-2 mb-5 bg-dark border border-gray-700 rounded-2xl px-4 py-3 outline-none"
          />

          <button className="w-full bg-danger rounded-2xl py-4 font-bold flex items-center justify-center gap-2">
            <Plus size={20} />
            Add Contact
          </button>
        </form>

        <div className="mt-6">
          {loading ? (
            <p className="text-gray-400">
              Loading contacts...
            </p>
          ) : contacts.length === 0 ? (
            <div className="bg-card border border-gray-800 rounded-3xl p-6 text-center">
              <Users
                className="mx-auto text-danger"
                size={42}
              />

              <h2 className="font-bold mt-4">
                No Emergency Contacts
              </h2>
            </div>
          ) : (
            <div className="grid gap-4">
              {contacts.map((contact) => (
                <div
                  key={contact._id}
                  className="bg-card border border-gray-800 rounded-2xl p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold">
                      {contact.name}
                    </h3>

                    <p className="text-gray-400 text-sm">
                      {contact.relationship}
                    </p>

                    <a
                      href={`tel:${contact.phone}`}
                      className="text-danger text-sm flex items-center gap-1 mt-1"
                    >
                      <Phone size={14} />
                      {contact.phone}
                    </a>
                  </div>

                  <button
                    onClick={() =>
                      handleDelete(contact._id)
                    }
                    className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center"
                  >
                    <Trash2
                      className="text-danger"
                      size={18}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default EmergencyContacts;