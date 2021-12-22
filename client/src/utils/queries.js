import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            showCount
            savedShows {
                showId
                title
                description
                image
                link
            
            }
        }
    }
`;