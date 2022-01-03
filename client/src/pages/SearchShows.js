import React, { useEffect, useState } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  CardColumns,
  Card
} from "react-bootstrap";
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { saveShowIds, getSavedShowIds } from "../utils/localStorage"
import { SAVE_SHOW } from "../utils/mutations"
import { SHOWS } from "../utils/queries"

const SearchShows = () => {
  const [searchedShow, setSearchedShow] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedShowIds, setSavedShowIds] = useState(getSavedShowIds)

  const [saveShow, { error }] = useMutation(SAVE_SHOW)

useEffect(() => {
  return () => saveShowIds(savedShowIds)
},[])

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    const options = {
      method: "GET",
      
      headers: {
        "x-rapidapi-host": "top-anime.p.rapidapi.com",
        "x-rapidapi-key": "985c5a5a52msh5e525b5f3d5f2adp1c9239jsn6cfdc252f604",
        useQueryString: true,
      },
      
      };
    fetch(`https://top-anime.p.rapidapi.com/anime/${searchInput}`, options)
    .then(data => data.json())
      .then(data => setSearchedShow(data))

    }
    

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Shows!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a show"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <CardColumns>
          {searchedShow.length && searchedShow.map((show, i) => {
                return (
                  <Card key={i} border='dark'>
                    {show.image ? (
                      <Card.Img src={show.image} alt={`The cover for ${show.title}`} variant='top' />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{show.title}</Card.Title>
                    </Card.Body>
                  </Card>
                );
              })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchShows;
