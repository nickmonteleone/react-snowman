import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

const TEST_WORDS = ["TEST"];

test("renders without crashing", function () {
  render (<Snowman words={TEST_WORDS} />)
});

test("shows number wrong", function () {
  const { container } = render (<Snowman words={TEST_WORDS} />);

  const aButton = container.querySelector('button[value="a"]');
  fireEvent.click(aButton);

  const nWrongText = container.querySelector('.Snowman-nWrong');
  expect(nWrongText).toContainHTML('Number wrong: 1')

  const bButton = container.querySelector('button[value="b"]');
  fireEvent.click(bButton);
  expect(nWrongText).toContainHTML('Number wrong: 2')
});