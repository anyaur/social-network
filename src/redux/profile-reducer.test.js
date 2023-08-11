import React from 'react';
import { render, screen } from '@testing-library/react';
import profileReducer, { addPostActionCreator } from './profile-reducer';

test('length of posts', () => {
  let action = addPostActionCreator("lala")

  let state = {
    posts: [
        { message: 'Хочу кутать', id: 1 },
        { message: 'Мяу', id: 2 }
    ]
}

    let newState = profileReducer(state, action)

  expect(newState.posts.length).toBe(3);
});