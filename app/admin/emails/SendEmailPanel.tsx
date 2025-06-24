'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

export default function SendEmailPanel() {
  const [emails, setEmails] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [mode, setMode] = useState<'to' | 'bcc'>('to')
  const testEmail = process.env.NEXT_PUBLIC_TEST_EMAIL || ''

  const send = async (test: boolean) => {
    const list = test ? [testEmail] : emails.split(/[,\n]/).map(e => e.trim()).filter(Boolean)
    if (!list.length) { toast.error('No emails'); return }
    const res = await fetch(`/api/admin/manual-email?secret=${process.env.NEXT_PUBLIC_ADMIN_SECRET}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emails: list, subject, html: body, mode })
    })
    const data = await res.json()
    if (data.success) {
      toast.success(`Sent to ${data.sentCount} recipient(s)`)
      if (!test) setEmails('')
    } else {
      toast.error(data.error || 'Send failed')
    }
  }

  return (
    <div className="space-y-2">
      <textarea
        className="w-full bg-black text-white border border-gray-500 rounded p-2"
        rows={3}
        placeholder="Emails separated by commas or new lines"
        value={emails}
        onChange={e => setEmails(e.target.value)}
      />
      <input
        className="w-full bg-black text-white border border-gray-500 rounded p-2"
        placeholder="Subject"
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />
      <textarea
        className="w-full bg-black text-white border border-gray-500 rounded p-2"
        rows={4}
        placeholder="HTML Body"
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <select
          value={mode}
          onChange={e => setMode(e.target.value as 'to' | 'bcc')}
          className="bg-black text-white border border-gray-500 rounded px-3 py-1"
        >
          <option value="to">To</option>
          <option value="bcc">BCC</option>
        </select>
        <button
          onClick={() => send(false)}
          className="bg-yellow-500 text-black font-semibold px-3 py-1 rounded"
        >
          Send
        </button>
        {testEmail && (
          <button
            onClick={() => send(true)}
            className="bg-blue-500 text-white font-semibold px-3 py-1 rounded"
          >
            Test to {testEmail}
          </button>
        )}
      </div>
    </div>
  )
}
