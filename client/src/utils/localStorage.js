export const getSavedShowIds = () => {
    const savedShowIds = localStorage.getItem("saved_shows")
    ? JSON.parse(localStorage.getItem("saved_shows"))
    : []

    return savedShowIds
}

export const getSavedMovieIds = () => {
    const savedMovieIds = localStorage.getItem("saved_movies")
    ? JSON.parse(localStorage.getItem("saved_movies"))
    : []
}

export const saveShowIds = (showIdArr) => {
    if (showIdArr.length) {
        localStorage.setItem("saved_shows", JSON.stringify(showIdArr))
    } else {
        localStorage.removeItem("saved_shows")
    }
}

export const saveMovieIds = (movieIdArr) => {
    if (movieIdArr.length) {
        localStorage.setItem("saved_movies", JSON.stringify(movieIdArr))
    } else {
        localStorage.removeItem("saved_movies")
    }
}

export const removeShowId = (showId) => {
    const savedShowIds = localStorage.getItem("saved_shows")
    ? JSON.parse(localStorage.getItem("saved_shows"))
    : null

    if (!savedShowIds) {
        return false
    }

    const updateSavedShowIds = savedShowIds?.filter((savedShowId) => savedShowId !== showId)
    localStorage.setItem("saved_show", JSON.stringify(updateSavedShowIds))

    return true
}

export const removeMovieId = (movieId) => {
    const savedMovieIds = localStorage.getItem("saved_movies")
    ? JSON.parse(localStorage.getItem("saved_movies"))
    : null

    if (!savedMovieIds) {
        return false
    }

    const updateSavedMovieIds = savedMovieIds?.filter((savedMovieId) => savedMovieId !== movieId)
    localStorage.setItem("saved_movie", JSON.stringify(updateSavedMovieIds))

    return true
}