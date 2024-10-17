import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import PaginationComponent from './AppPagination.vue'

describe('PaginationComponent', () => {
  const defaultProps = {
    totalPages: 10,
    currentPage: 1,
    totalRecords: 100,
    recordsPerPage: 10,
  }
  it('renders the pagination correctly', () => {
    const wrapper = mount(PaginationComponent, { props: defaultProps })
    expect(wrapper.findTestId('pagination').exists()).toBe(true)
  })

  it('disables previous button on the first page', () => {
    const wrapper = mount(PaginationComponent, { props: { ...defaultProps, currentPage: 1 } })
    const prevButton = wrapper.findAll('button')[0]
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('emits an event when next button is clicked', async () => {
    const wrapper = mount(PaginationComponent, { props: { ...defaultProps, currentPage: 5 } })
    const nextButton = wrapper.findAll('button')[1]
    await nextButton.trigger('click')
    expect(wrapper.emitted('update:currentPage')).toBeTruthy()
    expect(wrapper.emitted('update:currentPage')![0]).toEqual([6])
  })

  it('emits an event when previous button is clicked', async () => {
    const wrapper = mount(PaginationComponent, { props: { ...defaultProps, currentPage: 5 } })
    const prevButton = wrapper.findAll('button')[0]
    await prevButton.trigger('click')
    expect(wrapper.emitted('update:currentPage')).toBeTruthy()
    expect(wrapper.emitted('update:currentPage')![0]).toEqual([4])
  })
})