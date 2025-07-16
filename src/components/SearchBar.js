import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) onSearch(query);
  };
  return (
    // <form onSubmit={handleSubmit} className="d-flex">
    //   <input
    //     type="text"
    //     placeholder="Search recipes..."
    //     value={query}
    //     onChange={(e) => setQuery(e.target.value)}
    //     className="d-block"
    //   />
    //   <Button type="submit" variant="outline-primary">
    //     Search
    //   </Button>
    // </form>

    <Form onSubmit={handleSubmit} className="d-flex">
      <FormControl
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="me-2"
      />
      <Button type="submit" variant="outline-primary">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
