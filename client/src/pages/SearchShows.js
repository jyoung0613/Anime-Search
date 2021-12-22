import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Auth from '../utils/auth';
import { saveShowIds, getSavedShowIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_SHOW } from '../utils/mutations';

const SearchShows = () => {
    const [searchedShows, setSearchedShows] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedShowIds, setSavedShowIds] = useState(getSavedShowIds());

    const [saveShow, { error }] = useMutation(SAVE_SHOW);

    useEffect(() => {
        return () => saveShowIds(savedShowIds);
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        const request = require('request');

        const options = {
        method: 'GET',
        url: 'https://watchmode.p.rapidapi.com/list-titles/',
        qs: {
        types: 'movie,tv_series',
        regions: 'US',
        source_types: 'sub,free',
        source_ids: '23,206',
        page: '1',
        limit: '250',
        genres: '4,9'
        },
        headers: {
            'x-rapidapi-host': 'watchmode.p.rapidapi.com',
            'x-rapidapi-key': '985c5a5a52msh5e525b5f3d5f2adp1c9239jsn6cfdc252f604',
            useQueryString: true
        }
    };

        request(options, function (error, response, body) {
	        if (error) throw new Error(error);
	        console.log(body);
        });

        const { items } = await response.json();

        const showData = items.map((show) => ({
            showId: show.id,
            title: show.volumeInfo.title,
            description: show.volumeInfo.description,
            image: show.volumeInfo.imageLinks?.thumbnail || '',
          }));

          setSearchedShows(showData);
          setSearchInput('');
    };

    return (
        <>
          <Jumbotron fluid className='text-light bg-dark'>
            <Container>
              <h1>Search for Shows!</h1>
              <Form onSubmit={handleFormSubmit}>
                <Form.Row>
                  <Col xs={12} md={8}>
                    <Form.Control
                      name='searchInput'
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      type='text'
                      size='lg'
                      placeholder='Search for a show'
                    />
                  </Col>
                  <Col xs={12} md={4}>
                    <Button type='submit' variant='success' size='lg'>
                      Submit Search
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
            </Container>
          </Jumbotron>
    
          <Container>
            <h2>
              {searchedShows.length
                ? `Viewing ${searchedShows.length} results:`
                : 'Search for a show to begin'}
            </h2>
            <CardColumns>
              {searchedShows.map((show) => {
                return (
                  <Card key={show.showId} border='dark'>
                    {show.image ? (
                      <Card.Img src={show.image} alt={`The cover for ${show.title}`} variant='top' />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{show.title}</Card.Title>
                      <Card.Text>{show.description}</Card.Text>
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
}


export default SearchShows;
