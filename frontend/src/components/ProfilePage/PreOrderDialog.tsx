import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { ResponseObj } from '~/types'
import useAuth from '~/hooks/useAuth'

const validationSchema = yup.object().shape({
  price: yup.number().min(0, 'Offered price can not less than 0').required('Offered price is required'),
  message: yup.string().max(500, 'Message can not exceed 500 characters')
})

const initialValues = {
  price: '',
  message: ''
}

const PreOrderDialog = ({ creatorId }: { creatorId: number }) => {
  const { user } = useAuth()

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    const { price, message } = values

    console.log(price, message, creatorId, user?.id)

    try {
      await fetch(`${import.meta.env.VITE_API_ENDPOINT}/pre-orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          price,
          message,
          creatorId,
          customerId: user?.id || 0
        })
      })

      toast.success('Your offer have been sent.')
      resetForm()
    } catch (err) {
      console.error(err)
      toast.error((err as ResponseObj<null>).msg)
    }
    setSubmitting(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='font-semibold rounded-xl'>PreOrder</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        {user ? (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnBlur={false}
          >
            {({ isSubmitting }) => (
              <Form>
                <DialogHeader>
                  <DialogTitle>
                    <p className='font-bold text-2xl'>Make an art pre-order</p>
                  </DialogTitle>
                  <DialogDescription>
                    You will need to wait for the creator to accept the request. We won't charge anything.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-5 py-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='price' className='font-bold text-base'>
                      Your Offer
                    </Label>

                    <div className='relative mt-2 rounded-md shadow-sm'>
                      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                        <span className='sm:text-sm'>$</span>
                      </div>
                      <Field
                        type='number'
                        name='price'
                        id='price'
                        step={0.1}
                        min={0}
                        className='flex h-10 w-full rounded-md border border-input bg-background pl-7 pr-12 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                        placeholder='0.00'
                      />
                      <div className='absolute inset-y-0 right-2 flex justify-center items-center'>USD</div>
                    </div>
                    <ErrorMessage name='price' render={(value) => <p className='text-red-500 text-sm'>{value}</p>} />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='message' className='font-bold text-base'>
                      Add note (optional)
                    </Label>
                    <Field as={Textarea} placeholder='Type your message here.' id='message' name='message' />
                    <ErrorMessage name='message' render={(value) => <p className='text-red-500 text-sm'>{value}</p>} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type='submit' disabled={isSubmitting}>
                    Send
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        ) : (
          <p>You need to login to make an art pre-order.</p>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default PreOrderDialog
