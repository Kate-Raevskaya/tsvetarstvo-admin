import "cropperjs/dist/cropper.css"
import { useCallback, useRef, useState } from "react"
import type React from "react"
import { type ReactCropperElement } from "react-cropper"
import ReactCropper from "react-cropper"
import { useDropzone } from "react-dropzone"
import { type UseFormRegister, type UseFormSetValue } from "react-hook-form"

import { type FullProductData } from "../../../types/types"
import cls from "./AddImage.module.scss"

type Props = {
  register: UseFormRegister<FullProductData>
  setValue: UseFormSetValue<FullProductData>
}

interface FileWithPreview extends File {
  preview: string
}

export const AddImage = ({ register, setValue }: Props) => {
  const [file, setFile] = useState<FileWithPreview | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)

  const cropperRef = useRef<ReactCropperElement>(null)

  const cropWidth = 300 // Ширина обрезанного изображения
  const cropHeight = 300 // Высота

  const onCrop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const cropper = cropperRef.current?.cropper
    if (cropper) {
      // Получаем обрезанное изображение с нужным размером
      const canvas = cropper.getCroppedCanvas({
        width: cropWidth, // Фиксированная ширина
        height: cropHeight, // Фиксированная высота
      })
      setValue("imageUrl", canvas.toDataURL())
      setCroppedImage(canvas.toDataURL()) // Получаем Base64 строку
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const fileWithPreview = Object.assign(file, {
      preview: URL.createObjectURL(file),
    })
    setFile(fileWithPreview)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: { "image/*": [] },
    onDrop,
  })

  return (
    <div>
      <label>
        Фото
        <div {...getRootProps()} className={cls.wrapper}>
          <input {...getInputProps({ ...register("imageUrl") })} />
          {isDragActive ? (
            <p>Поместите сюда файл</p>
          ) : (
            <p>Перетащите изображение или выберите его для загрузки</p>
          )}
        </div>
      </label>
      <div>
        {file && (
          <div>
            <ReactCropper
              ref={cropperRef}
              src={file.preview}
              // style={{ height: 400, width: "100%" }}
              aspectRatio={3 / 4} // Соотношение сторон для обрезки, можно изменить
              guides={true} // Скрыть направляющие
              scalable={true} // Возможность масштабировать
              cropBoxResizable={true} // Возможность изменять размер обрезки
            />
            <div>
              <button onClick={onCrop}>Обрезать</button>
            </div>
          </div>
        )}

        {croppedImage && (
          <div>
            <img
              src={croppedImage}
              alt="Cropped"
              // style={{ marginTop: "20px", maxWidth: "100%" }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
