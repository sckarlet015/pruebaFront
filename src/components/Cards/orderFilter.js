const order = (contactos, sortOrder, searchQuery) => {
    let filteredContacts = contactos;

    if (searchQuery?.length > 0) {
      const query = searchQuery.toLowerCase();
      filteredContacts = filteredContacts.filter((contact) =>
        isNaN(searchQuery)
          ? contact.nombre.toLowerCase().includes(query)
          : contact.id.toString().includes(searchQuery)
      );
    }

    const sortedContacts = filteredContacts.sort((a, b) => {
      switch (sortOrder) {
        case "AtoZ":
          return a.nombre.localeCompare(b.nombre);
        case "ZtoA":
          return b.nombre.localeCompare(a.nombre);
        default:
          return 0;
      }
    });
    return sortedContacts;
  };
  
  export { order };
  