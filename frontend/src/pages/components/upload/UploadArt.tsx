import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import useAuth from '~/hooks/useAuth'

function UploadArt() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>('')

  const [artName, setArtName] = useState('')
  const [artDescription, setArtDescription] = useState('')
  const [artType, setArtType] = useState('')
  const [tags, setTags] = useState('')

  if (!user) {
    return <div className='h-40 grid place-items-center'>You must be logged in to upload art</div>
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setFileName(file.name)
    }
  }

  const handleClearImage = () => {
    setSelectedFile(null)
    setFileName('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile) {
      alert('Please select a file')
      return
    }

    const validFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']
    if (!validFormats.includes(selectedFile.type)) {
      toast.error('Invalid file format. Only JPG, PNG, GIF, and SVG are allowed.')
      return
    }

    // Giả sử bạn muốn giới hạn kích thước tệp tối đa là 5MB
    const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
    if (selectedFile.size > maxSizeInBytes) {
      toast.error('File size exceeds the 5MB limit.')
      return
    }

    // Kiểm tra tên tác phẩm
    if (!artName.trim()) {
      toast.error('Art name is required.')
      return
    }

    // Kiểm tra mô tả tác phẩm
    if (!artDescription.trim()) {
      toast.error('Art description is required.')
      return
    }

    // Kiểm tra loại tác phẩm nghệ thuật
    if (!artType) {
      toast.error('Please select an art type.')
      return
    }

    // Kiểm tra tags
    if (!tags.trim()) {
      toast.error('At least one tag is required.')
      return
    }
    const formData = new FormData()
    formData.append('artFile', selectedFile)
    formData.append('title', artName)
    formData.append('description', artDescription)
    formData.append('artType', artType)
    formData.append('tags', tags)
    formData.append('ownerId', user.id.toString())

    try {
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/arts/',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      }

      const response = await axios.request(config)

      console.log(response.data)
      toast.success('Art uploaded successfully!')
      navigate('/art/' + response.data.data)
      // Clear form or manage state as needed after successful upload
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('An error occurred. Please try again.')
    }
  }

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <form action='/upload' onSubmit={handleSubmit} method='post' className='space-y-6 bg-white shadow rounded-lg p-6'>
        <div className='space-y-2'>
          <label
            htmlFor='dropzone-file'
            className='flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700 dark:border-gray-600 transition duration-150 ease-in-out'
          >
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
              <svg
                className='w-10 h-10 mb-3 text-gray-400'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path d='M7 7l3-3 3 3 3-3 3 3v13H4V7z'></path>
                <path d='M14 4l-3 3-3-3'></path>
              </svg>
              <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                <span className='font-semibold'>Click to upload</span> or drag and drop
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>SVG, PNG, JPG, GIF (MAX. 800x400px)</p>
            </div>
            <input id='dropzone-file' type='file' className='hidden' onChange={handleFileSelect} />
          </label>
          {selectedFile && (
            <div className='flex flex-col items-center'>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt='Preview'
                className='max-h-40 w-auto mt-4 rounded shadow'
              />
              <p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>{fileName}</p>
              <button
                onClick={handleClearImage}
                className='mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Clear Image
              </button>
            </div>
          )}
        </div>

        <div>
          <label htmlFor='artName' className='block text-gray-700 text-sm font-semibold mb-2'>
            Art Name
          </label>
          <input
            id='artName'
            type='text'
            value={artName}
            onChange={(e) => setArtName(e.target.value)}
            className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter art name'
            required
          />
        </div>

        <div>
          <label htmlFor='artDescription' className='block text-gray-700 text-sm font-semibold mb-2'>
            Art Description
          </label>
          <textarea
            id='artDescription'
            value={artDescription}
            onChange={(e) => setArtDescription(e.target.value)}
            className='shadow resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter art description'
            required
          ></textarea>
        </div>

        <div className='flex items-center mb-4'>
          <span className='text-gray-700 text-sm font-semibold mr-4'>Art Type:</span>
          <label htmlFor='digitalArt' className='inline-flex items-center mr-4'>
            <input
              type='radio'
              id='digitalArt'
              value='digital'
              checked={artType === 'digital'}
              onChange={() => setArtType('digital')}
              className='form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'
            />
            <span className='ml-2'>Digital Art</span>
          </label>
          <label htmlFor='physicalArt' className='inline-flex items-center'>
            <input
              type='radio'
              id='physicalArt'
              value='physical'
              checked={artType === 'physical'}
              onChange={() => setArtType('physical')}
              className='form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'
            />
            <span className='ml-2'>Physical Art</span>
          </label>
        </div>

        <div>
          <label htmlFor='tags' className='block text-gray-700 text-sm font-semibold mb-2'>
            Tags
          </label>
          <input
            id='tags'
            type='text'
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Separate tags with commas'
            required
          />
        </div>

        <div className='flex justify-center'>
          <button
            type='submit'
            className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default UploadArt
