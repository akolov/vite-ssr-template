export { onBeforeRoute }

function onBeforeRoute() {
  return {
    pageContext: {
      isPrerendering: true
    }
  }
}
