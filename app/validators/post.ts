import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
    vine.object({
        title: vine.string().trim().maxLength(255),
        description: vine.string().trim().minLength(10).maxLength(500),
        draft: vine.boolean().optional(),
        category: vine.enum(['public', 'private', 'free_to_use']),
        numberOfViews: vine.number().positive().withoutDecimals()
    })
)