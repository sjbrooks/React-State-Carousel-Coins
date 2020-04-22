import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", function () {
  render(<Carousel />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");

  // expect the second image to show, but not the first
  fireEvent.click(rightArrow);
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move backwards in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("hides the left arrow when you are at the first image", function () {
  const { container } = render(<Carousel />);
  
  // expect the left arrow with CSS class of hidden to be found (and therefore result in bool value of true)
  const hiddenLeftArrow = container.querySelector('.fas.fa-chevron-circle-left.fa-2x.hidden');
  console.log(`\n\n\n The value of hiddenLeftArrow is `, hiddenLeftArrow, '\n\n\n');
  expect(Boolean(hiddenLeftArrow)).toEqual(true);
  
});


it("hides the right arrow when you reach the last image", function () {
  const total = Carousel.defaultProps.cardData.length;
  const { container, queryByTestId } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");
  
  // Clicks through to the last image in the carousel
  for (let i = 0; i < (total-1); i++) {
    fireEvent.click(rightArrow);
  }
  
  // expect the right arrow with CSS class of hidden to be found (and therefore result in bool value of true)
  const hiddenRightArrow = container.querySelector('.fas.fa-chevron-circle-right.fa-2x.hidden');
  console.log(`\n\n\n The value of hiddenRightArrow is `, hiddenRightArrow, '\n\n\n');
  expect(Boolean(hiddenRightArrow)).toEqual(true);
});