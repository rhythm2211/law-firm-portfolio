/* global React, ReactDOM */

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  const openBook = () => {
    setChatOpen(false);
    setBookOpen(true);
  };
  const openChat = () => {
    setBookOpen(false);
    setChatOpen(true);
  };

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
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
