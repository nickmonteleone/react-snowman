import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";

import { randomWord } from "./words";


const TEST_WORDS = ["TEST"];
const TEST_MAX_GUESS = 3;
const TEST_IMAGES = [img0, img1, img2, img3];

test("renders without crashing", function () {
  render(
    <Snowman
      images={TEST_IMAGES}
      words={TEST_WORDS}
      maxWrong={TEST_MAX_GUESS}
    />
  );
});

test("shows number wrong", function () {
  const { container } = render(
    <Snowman
      images={TEST_IMAGES}
      words={TEST_WORDS}
      maxWrong={TEST_MAX_GUESS}
    />
  );
  // TODO: add comment "click the a button" (should have comments walk through what we are mimicing in app)
  const aButton = container.querySelector('button[value="a"]');
  fireEvent.click(aButton);

  const nWrongText = container.querySelector('.Snowman-nWrong');
  expect(nWrongText).toContainHTML('Number wrong: 1');

  const bButton = container.querySelector('button[value="b"]');
  fireEvent.click(bButton);
  expect(nWrongText).toContainHTML('Number wrong: 2');
});

test("can't have more nWrong than maxWrong (with snapshot)", function () {
  const { container } = render(
    <Snowman
      images={TEST_IMAGES}
      words={TEST_WORDS}
      maxWrong={TEST_MAX_GUESS}
    />
  );

  const aButton = container.querySelector('button[value="a"]');
  const bButton = container.querySelector('button[value="b"]');
  const cButton = container.querySelector('button[value="c"]');
  //TODO: Add comment "click a through c buttons"
  fireEvent.click(aButton);
  fireEvent.click(bButton);
  fireEvent.click(cButton);

  const dButton = container.querySelector('button[value="d"]');
  const img = container.querySelector('img[alt="3"]');
  // TODO: also check that dButton was there before
  expect(dButton).toEqual(null);
  expect(container).toContainHTML(`You lose, correct word is ${TEST_WORDS[0]}`);
  expect(img).not.toEqual(null);
  // TODO: move snapshot to separate test
  expect(container).toMatchSnapshot();
});

test(
  "reset button works by resetting nWrong, answer, and guessedLetters states",
  function () {
    let reset_test_words = ['TEST']

    const { container } = render(
      <Snowman
        images={TEST_IMAGES}
        words={reset_test_words}
        maxWrong={TEST_MAX_GUESS}
      />
    );

    const aButton = container.querySelector('button[value="a"]');
    const bButton = container.querySelector('button[value="b"]');
    fireEvent.click(aButton);
    fireEvent.click(bButton);

    const nWrongText = container.querySelector('.Snowman-nWrong');
    expect(nWrongText).toContainHTML('Number wrong: 2');
    // TODO: add comment and clarify that these are disabled letter buttons
    let disabledBtn = container.querySelector('button[disabled]');
    expect(disabledBtn).not.toEqual(null);

    reset_test_words = ['RESET'];

    const resetBtn = container.querySelector(".Snowman-reset");
    fireEvent.click(resetBtn);

    // // TODO: Mock randomWord to make sure word reset happens.
    // randomWord = jest.fn();
    // randomWord.mockReturnValue('RESET')
    // console.log('randomWord', randomWord(TEST_WORDS))
    // jest.spyOn(randomWord).mockReturnValue('RESET');
    // console.log('randomWord', randomWord(TEST_WORDS));

    expect(nWrongText).toContainHTML('Number wrong: 0');

    // const rButton = container.querySelector('button[value="r"]');
    // fireEvent.click(rButton);

    // expect(nWrongText).toContainHTML('Number wrong: 0');


    disabledBtn = container.querySelector('button[disabled]');
    expect(disabledBtn).toEqual(null);
  });