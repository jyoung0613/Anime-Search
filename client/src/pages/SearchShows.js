import React, { useState } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
//import Auth from '../utils/auth';
//import { useMutation } from '@apollo/client';


const SearchShows = () => {
    const [searchedShows, setSearchedShows] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }
        const request = require('request');

        const options = {
          method: 'GET',
          url: `https://top-anime.p.rapidapi.com/anime/${searchInput}`,
          headers: {
            'x-rapidapi-host': 'top-anime.p.rapidapi.com',
            'x-rapidapi-key': '985c5a5a52msh5e525b5f3d5f2adp1c9239jsn6cfdc252f604',
            useQueryString: true
          }
        }
      
        request(options, function (error, response, body) {
	        if (error) throw new Error(error);
	        console.log(body);
        });

        const response = request;

        const { items } = response.json();

        const showData = items.map((show) => ({
            showId: show.id,
            title: show.volumeInfo.title,
            address: show.volumeInfo.address,
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
            <CardColumns>
              {searchedShows.map((show) => {
                return (
                  <Card key={show.showId} border='dark'>
                    {show.image ? (
                      <Card.Img src={show.image} alt={`The cover for ${show.title}`} variant='top' />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{show.title}</Card.Title>
                      <Card.Text>{show.address}</Card.Text>
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
