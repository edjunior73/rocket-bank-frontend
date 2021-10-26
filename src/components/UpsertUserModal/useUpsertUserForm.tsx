import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import iziToast from 'izitoast'
import { viacepApi } from 'constants/axios'

export interface UpsertUserInputForm {
  name: string
  birthday: string | null
  city: string
  state: string
  zipCode: string
}

interface ViaCepType {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro?: boolean
}

export const useUpsertUserForm = () => {
  const validationSchema = yup.object({
    name: yup.string().required('Nome é um campo obrigatório'),
    birthday: yup.mixed().required('Data de nascimento é um campo obrigatório'),
    city: yup.string().required('Cidade é um campo obrigatório'),
    state: yup
      .string()
      .required('Estado é um campo obrigatório')
      .length(2, 'Apenas a sigla do estado é permitida'),
    zipCode: yup.string().required('CEP é um campo obrigatório')
  })

  const {
    watch,
    control,
    handleSubmit: onSubmit,
    getValues,
    formState,
    setValue,
    reset
  } = useForm<UpsertUserInputForm>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
    defaultValues: {
      birthday: null
    }
  })

  const searchZipCode = async () => {
    const zipCode = getValues('zipCode')
    if (zipCode.length === 9) {
      try {
        const { data } = await viacepApi.get<ViaCepType>(`/${zipCode}/json`)
        if (data.erro) iziToast.error({ message: 'Falha ao consultar o CEP' })
        setValue('state', data.uf, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true
        })
        setValue('city', data.localidade, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true
        })
      } catch {
        iziToast.error({ message: 'Falha ao consultar o CEP' })
      }
    }
  }

  const models = { errors: formState.errors, watch, formState, setValue, control, reset }
  const operations = {
    onSubmit,
    searchZipCode
  }

  return [models, operations] as [typeof models, typeof operations]
}
