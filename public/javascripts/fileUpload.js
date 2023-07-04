FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
)
// FilePond.registerPlugin(FilePondPluginFileEncode);
// FilePond.registerPlugin(FilePondPluginImageResize);
// FilePond.registerPlugin(FilePondPluginImagePreview);
FilePond.parse(document.body);