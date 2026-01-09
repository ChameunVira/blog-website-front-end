import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const FileDropzone: React.FC<any> = ({ sendImage }) => {
    const onDrop = useCallback((acceptedFiles: any) => {
        handleImageUplaod(acceptedFiles);
    }, []);

    const handleImageUplaod = (acceptedFiles: any) => {
        const file = acceptedFiles[0];
        if (file) {
            sendImage(file);
        }
    }

    const { getInputProps, getRootProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false
    });

    return (
        <div style={{ width: "100%" }}>
            <div {...getRootProps()}
                style={{
                    border: "2px dashed #999",
                    width: "100%",
                    padding: "40px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: isDragActive ? "#f0f8ff" : "#fafafa",
                }}
            >
                <input {...getInputProps()}
                />
                {isDragActive ? (<p className='text-center'>Drop the files here ...</p>) :
                    (<p className='text-center'>Drag 'n' drop some files here, or click to select files</p>)
                }
            </div>
        </div>
    )
}

export default FileDropzone
