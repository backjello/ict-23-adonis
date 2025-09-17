import Post from '#models/post'
import factory from '@adonisjs/lucid/factories'

export const PostFactory = factory
  .define(Post, async ({ faker }) => {
    return {
      title: faker.lorem.words(5),
      description: faker.lorem.text(),
      numberOfViews: faker.number.int({ min: 100, max: 1000000 }),
      category: ['private', 'public', 'free_to_use']
        .at(faker.number.int({ min: 0, max: 2 })) as any,
      draft: faker.number.int() % 2 == 0
    }
  })
  .build()