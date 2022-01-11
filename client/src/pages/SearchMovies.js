import React, { useEffect, useState } from "react";
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from "react-bootstrap";
import Auth from '../utils/auth';
import { savedMovieIds, getSavedMovieIds } from "../utils/localStorage"
import { useMutation } from '@apollo/client';
import { SAVE_MOVIE } from "../utils/mutations";

const SearchMovies = () => {
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [searchInputTwo, setSearchInputTwo] = useState('');
    const [saveMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

    const [saveMovie, { error }] = useMutation(SAVE_MOVIE);

    useEffect(() => {
        return () => saveMovieIds(saveMovieIds)
    })

    const handleFormSubmitTwo = async (event) => {
        event.preventDefault();

        if (!searchInputTwo) {
            return false;
        }

        const options = {
            method: 'GET',
            qs: {search_field: 'name', search_value: 'Breaking Bad', types: 'tv'},
            headers: {
                'x-rapidapi-host': 'watchmode.p.rapidapi.com',
                'x-rapidapi-key': '985c5a5a52msh5e525b5f3d5f2adp1c9239jsn6cfdc252f604',
                useQueryString: true
            }
        };
        fetch('https://watchmode.p.rapidapi.com/search/', options)
        .then(data => data.json())
            .then(data => setSearchedMovies(data))
    };

    const handleSaveMovie = async (movieId) => {
        const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        console.log(movieId);

        if (!token) {
            return false;
        }

        try {
            const { data } = await saveMovie({
                variables: { newMovie: { ...movieToSave } },
            });

          setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);  
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Jumbotron fluid className='text-light'>
                <Container>
                    <h1>Search for Movies!</h1>
                    <Form onSubmit={handleFormSubmitTwo}>
                        <Form.Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    name='searchInputTwo'
                                    value={searchInputTwo}
                                    onChange={(e) => setSearchInputTwo(e.target.value)}
                                    type='text'
                                    size='lg'
                                    placeholder='Search for a Movie'
                                />
                            </Col>
                            <Col xs={12} sm={12} md={4} className='btn-div'>
                                <Button type='submit' size='lg'>
                                    Submit Search
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </Jumbotron>

            <Container>
                <h2>
                    {searchedMovies.length
                        ? `Viewing ${searchedMovies.length} results:`
                        : 'Search for a Movie to begin'}
                </h2>
                <CardColumns>
                    {searchedMovies.length && searchedMovies.map((movie, i) => {
                        return (
                            <Card key={i} border='dark'>
                                {movie.image_url ? (
                                    <Card.Img src={movie.image_url} alt={`The cover for ${movie.title}`} variant='top' />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Link>{movie.url}</Card.Link>
                                    {Auth.loggedIn() && (
                                        <Button
                                            disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
                                            className='btn-block btn-info'
                                            onClick={() => handleSaveMovie(movie.movieId)}>
                                            {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                                                ? 'This movie has already been saved!'
                                                : 'Save this Movie!'}
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

export default SearchMovies;

