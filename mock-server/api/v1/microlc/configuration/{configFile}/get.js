const configuration = {
  "type": "row",
  "attributes": {
    "style": "display: flex; flex-direction: column;"
  },
  "content": [
    {
      "type": "element",
      "tag": "script",
      "attributes": {
        "src": "./api/v1/microlc/configuration/lodash-test",
        "type": "module"
      }
    },
    {
      "type": "element",
      "tag": "script",
      "attributes": {
        "data-stencil-namespace": "duet"
      }
    },
    {
      "type": "element",
      "tag": "duet-hero",
      "url": "https://cdn.duetds.com/api/components/4.34.2/lib/duet/duet.esm.js",
      "attributes": {
        "heading": "Hero component",
        "description": "Page made with duet components",
        "button-label": "Go to another page",
        "button-url": "/react-app"
      }
    },
    {
      "type": "element",
      "tag": "duet-textarea",
      "attributes": {
        "expand": true,
        "label": "What do you think about this page?",
        "placeholder": "Write here your review"
      }
    },
    {
      "type": "column",
      "attributes": {
        "style": "display: flex; flex-direction: row-reverse;"
      },
      "content": [
        {
          "type": "element",
          "tag": "duet-button",
          "attributes": {
            "variation": "primary"
          },
          "properties": {
            "innerHTML": "Submit"
          }
        }
      ]
    }
  ]
}

module.exports = (request, response) => {
  response
    .delay(1000)
    .send(configuration)
}
