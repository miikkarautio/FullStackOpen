import { test, expect } from '@playwright/test'
import { beforeEach, describe } from 'node:test'

test.describe('Note app', () => {
    test.beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(
            page.getByText(
                'Note app, Department of Computer Science, University of Helsinki 2025'
            )
        ).toBeVisible()
    })

    test('user can log in', async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByLabel('username').fill('mluukkai')
        await page.getByLabel('password').fill('salainen')

        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test.describe('when logged in', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByLabel('username').fill('mluukkai')
            await page.getByLabel('password').fill('salainen')
            await page.getByRole('button', { name: 'login' }).click()
        })

        test('a new note can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'new note' }).click()
            await page.getByRole('textbox').fill('a note created by playwright')
            await page.getByRole('button', { name: 'save' }).click()
            await expect(page.getByText('a note created by playwright')).toBeVisible()
        })

        test.describe('and a note exists', () => {
            test.beforeEach(async ({ page }) => {
                await page.getByRole('button', { name: 'new note' }).click()
                await page.getByRole('textbox').fill('another note by playwright')
                await page.getByRole('button', { name: 'save' }).click()
            })

            test('importance can be changed', async ({ page }) => {
                await page.getByRole('button', { name: 'make not important' }).click()
                await expect(page.getByText('make important')).toBeVisible()
            })
        })
    })
    test('login fails with wrong password', async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByLabel('username').fill('mluukkai')
        await page.getByLabel('password').fill('wrong')
        await page.getByRole('button', { name: 'login' }).click()

        const errorDiv = page.locator('.error')
        await expect(errorDiv).toContainText('wrong credentials')
    })
})