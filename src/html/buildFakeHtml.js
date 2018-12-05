const buildFakeHtml = (fakeMarkup) => {
  return new DOMParser().parseFromString(fakeMarkup, 'text/html').body.firstChild.content;
};

export default buildFakeHtml;
