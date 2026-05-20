import { useState } from 'react'
import { AnnouncementBar } from './components/AnnouncementBar'
import { Hero } from './components/Hero'
import { Recognition } from './components/Recognition'
import { About } from './components/About'
import { Practice } from './components/Practice'
import { Showcase } from './components/Showcase'
import { Cases, Methodology, Testimonials } from './components/CaseSections'
import { People, Insights } from './components/PeopleInsights'
import { ContactFooter } from './components/ContactFooter'
import { ChatLauncher } from './components/ChatLauncher'
import { ChatWidget } from './components/ChatWidget'
import { BookingModal } from './components/BookingModal'

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const [bookOpen, setBookOpen] = useState(false)

  const openBook = () => {
    setChatOpen(false)
    setBookOpen(true)
  }
  const openChat = () => {
    setBookOpen(false)
    setChatOpen(true)
  }

  return (
    <>
      <AnnouncementBar />
      <main>
        <Hero onBook={openBook} onChat={openChat} />
        <Recognition />
        <About onBook={openBook} />
        <Practice />
        <Showcase />
        <Cases />
        <Methodology />
        <Testimonials />
        <People />
        <Insights />
        <ContactFooter onBook={openBook} onChat={openChat} />
      </main>
      <ChatLauncher onClick={openChat} hidden={chatOpen} />
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} onBook={openBook} />
      <BookingModal open={bookOpen} onClose={() => setBookOpen(false)} />
    </>
  )
}
