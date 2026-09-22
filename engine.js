let guestList = [
 {
    id: 1,
    name: "Imran Hossen",
    type: "vip",
  },
  {
    id: 2,
    name: "Munna",
    type: "civil",
  },
  {
    id: 3,
    name: "Foyez",
    type: "civil",
  },
  {
    id: 4,
    name: "Humu",
    type: "defense",
  },
];

const guestTable = document.getElementById("guest-table");
const guestName = document.getElementById("guest-name");
const guestPhone = document.getElementById("guest-phone");
const guestType = document.getElementById("guest-type");
const guesAdd = document.getElementById("guest-add");

const headerRow = `
        <tr class="border">
            <th class="border p-2">
                Guest Name
            </th>
            <th class="border p-2">
                Type
            </th>
            <th class="border p-2">
                Phone
            </th>
            <th class="border p-2">
                Actions
            </th>
        </tr>
`;

const addGuestList = (guest) => {
    const name = guestName.value;
    const phone = guestPhone.value;
    const type = guestType.value;
    console.log();

    guestList.push({
        id: Date.now(),
        name,
        phone,
        type,
    });
    guestName.value = "";
    guestPhone.value = "";

    render(guestList);
};

const deleteGuest = (id) => {
    guestList = [...guestList.filter((guest) => guest.id != id)]
    render(guestList);
}

const editGuest = (guest) => {
    deleteGuest(guest.id);
    addGuestList(guest);
}

const createGuestRow = (guest) => {
    return ` <tr class="border">
            <td class="border p-2">
                 ${guest.name}
            </td >
            <td class="border p-2">
                 ${guest.type}
            </td>
            <td class="border p-2">
                 ${guest.phone || "01xxxxxxxxx"}
            </td>
            <td class="border p-2">
                <button
                 data-action="delete"
                 data-id="${guest.id}"
                class="p-1 bg-red-500 rounded-sm  text-white cursor-pointer">Delete</button>
                <button class="p-1 bg-yellow-500 rounded-sm text-white cursor-pointer">Edit</button>
            </td>
        </tr>
    `;
};

const render = (guestList) => {
    let rows =headerRow;
    for (let i=0; i < guestList.length; i++) {
        rows += createGuestRow(guestList[i]);
    }
    guestTable.innerHTML = rows;
};

guesAdd.addEventListener("click", addGuestList);
guestTable.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    console.log(button);

    if (!button)
        return;
    const action = button.dataset.action;
    const id = Number(button.dataset.id);

    if(action === "delete") {
        deleteGuest(id);
    }
});
render(guestList);