import CMS from "netlify-cms-app"
import cloudinary from "netlify-cms-media-library-cloudinary"

CMS.registerMediaLibrary(cloudinary)
CMS.registerEditorComponent({
  id: "youtube",
  label: "Youtube",
  fields: [{ name: "id", label: "Youtube Video ID" }],
  pattern: /^{{<\s?youtube (\S+)\s?>}}/,
  fromBlock: match => {
    return {
      id: match[1],
    }
  },
  toBlock: obj => {
    return "{{< youtube " + obj.id + " >}}"
  },
  toPreview: obj => {
    return (
      '<img src="http://img.youtube.com/vi/' +
      obj.id +
      '/maxresdefault.jpg" alt="Youtube Video"/>'
    )
  },
})
