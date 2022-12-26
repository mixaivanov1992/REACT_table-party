type Callback = (error: string, data: string) => void;
export const useImageProcessing = () => (callback: Callback, files: FileList | null, type: string) => {
    if (!files) {
        callback('fileNotFound', '');
        return;
    }
    const file = files[0];
    if (file.type !== type) {
        callback('incorrectFileType', '');
        return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
            callback('', fileReader.result);
        }
    };

    fileReader.onerror = (error: ProgressEvent<FileReader>) => { callback(error.toString(), ''); };
};
