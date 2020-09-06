import CMS from "netlify-cms-app"
import cloudinary from "netlify-cms-media-library-cloudinary"
import ProjectPreview from "./preview-templates/project-preview"
import YouTube from "../components/youtube"

CMS.registerMediaLibrary(cloudinary)

CMS.registerEditorComponent(YouTube)

CMS.registerPreviewTemplate("project", ProjectPreview)
