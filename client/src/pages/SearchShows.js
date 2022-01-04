import React, { useEffect, useState } from "react";
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from "react-bootstrap";
import Auth from '../utils/auth';
import { saveShowIds, getSavedShowIds } from "../utils/localStorage"
import { useMutation } from '@apollo/client';
import { SAVE_SHOW } from "../utils/mutations"

const SearchShows = () => {
  const [searchedShow, setSearchedShow] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedShowIds, setSavedShowIds] = useState(getSavedShowIds());

  const [saveShow, { error }] = useMutation(SAVE_SHOW);
  console.log(error);

  useEffect(() => {
    return () => saveShowIds(savedShowIds)
  })
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    const options = {
      method: 'GET',
      qs: {q: `${searchInput}`},
      headers: {
        'x-rapidapi-host': 'jikan1.p.rapidapi.com',
        'x-rapidapi-key': '985c5a5a52msh5e525b5f3d5f2adp1c9239jsn6cfdc252f604',
        useQueryString: true
      }
    };
    fetch('https://jikan1.p.rapidapi.com/search/anime', options)
    .then(data => data.json())
      .then(data => setSearchedShow(data))
    };

    const handleSaveShow = async (showId) => {
      const showToSave = searchedShow.find((show) => show.showId === showId);
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }

      try {
        const { data } = await saveShow({
          variables: { newShow: { ...showToSave } },
        });

        setSavedShowIds([...savedShowIds, showToSave.showId]);
      } catch (err) {
        console.error(err);
      }
    };

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
      <h2>
        {searchedShow.length
          ? `Viewing ${searchedShow.length} results:`
          : 'Search for a show to begin'}
      </h2>
        <CardColumns>
          {searchedShow.length && searchedShow.map((show, i) => {
                return (
                  <Card key={i} border='dark'>
                    {show.image_url ? (
                      <Card.Img src={show.image_url} alt={`The cover for ${show.title}`} variant='top' />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{show.title}</Card.Title>
                      <Card.Link>{show.url}</Card.Link>
                      {Auth.loggedIn() && (
                        <Button
                          disabled={savedShowIds?.some((savedShowId) => savedShowId === show.showId)}
                          className='btn-block btn-info'
                          onClick={() => handleSaveShow(show.showId)}>
                          {savedShowIds?.some((savedShowId) => savedShowId === show.showId)
                            ? 'This show has already been saved!'
                            : 'Save this Show!'}
                          </Button>
                      )}
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
