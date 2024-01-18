import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";

const TEST_WORDS = ["TEST"];
const TEST_MAX_GUESS = 3;
const TEST_IMAGES = [img0, img1, img2, img3]

test("renders without crashing", function () {
  render (
    <Snowman
      images={TEST_IMAGES}
      words={TEST_WORDS}
      maxWrong={TEST_MAX_GUESS}
    />
  )
});

test("shows number wrong", function () {
  const { container } = render (
    <Snowman
      images={TEST_IMAGES}
      words={TEST_WORDS}
      maxWrong={TEST_MAX_GUESS}
    />
  );

  const aButton = container.querySelector('button[value="a"]');
  fireEvent.click(aButton);

  const nWrongText = container.querySelector('.Snowman-nWrong');
  expect(nWrongText).toContainHTML('Number wrong: 1')

  const bButton = container.querySelector('button[value="b"]');
  fireEvent.click(bButton);
  expect(nWrongText).toContainHTML('Number wrong: 2')
});

test("can't have more nWrong than maxWrong (with snapshot)", function () {
  const { container } = render (
    <Snowman
      images={TEST_IMAGES}
      words={TEST_WORDS}
      maxWrong={TEST_MAX_GUESS}
    />
  );

  const aButton = container.querySelector('button[value="a"]');
  const bButton = container.querySelector('button[value="b"]');
  const cButton = container.querySelector('button[value="c"]');

  fireEvent.click(aButton);
  fireEvent.click(bButton);
  fireEvent.click(cButton);

  const dButton = container.querySelector('button[value="d"]');
  const img = container.querySelector('img[alt="3"]');

  expect(dButton).toEqual(null);
  expect(container).toContainHTML(`You lose, correct word is ${TEST_WORDS[0]}`);
  expect(img).not.toEqual(null);

  expect(container).toMatchSnapshot();
});