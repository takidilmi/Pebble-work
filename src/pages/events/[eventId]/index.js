import {
    arrayUnion,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import Image from "next/image";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/util/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";

const EventsPage = ({ event, organizer }) => {
    const cellData = [
        "Mona M.",
        "Aether M.",
        "Jangis M.",
        "Lisa M.",
        "Diluc M.",
        "Dori S.",
    ];

    const [joined, setJoined] = useState();
    const [userMail, setUserMail] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUserMail(user.email);
                console.log(user.email);
            } else {
                // User is signed out
                setUserMail(null); // Reset to null when signed out
            }
        });

        return () => {
            // Unsubscribe from the observer when the component is unmounted
            unsubscribe();
        };
    }, []);

    const deleteEvent = async () => {
        await deleteDoc(doc(db, "events", event.eventId));

        alert("Event successfully deleted");

        window.location.href = `/events/`;
    };

    const attendeesArr = event.attendees;
    console.log(event.eventId, 456);
    //console.log(userMail, attendeesArr[0].email, 160)

    const findUser = attendeesArr.find((item) => {
        return item.email === userMail;
    });

    const joinEvent = async (eventId) => {
        const userId = auth?.currentUser?.uid;
        const userDocRef = doc(db, "users", userId);
        const eventDocRef = doc(db, "events", eventId);

        const userDoc = await getDoc(userDocRef);
        const eventDoc = await getDoc(eventDocRef);

        const eventObject = eventDoc.data();
        const userObject = userDoc.data();

        const eventInfo = { ...eventObject, uid: eventId };

        await updateDoc(userDocRef, {
            eventsJoined: arrayUnion(eventInfo),
        });

        await updateDoc(eventDocRef, {
            attendees: arrayUnion(userObject),
        });

        alert("Event joined successfully");

        window.location.reload();
    };
    return (
        <>
            <div style={{ margin: "auto", width: "60%", paddingTop: "6rem" }}>
                <h2
                    className='text-2xl font-bold'
                    style={{ marginBottom: "2rem" }}
                >
                    {event.title}
                </h2>
                <div
                    style={{ marginBottom: "6rem", gap: "4rem" }}
                    className='flex flex-col sm:flex-row mb-16 sm:mb-32 gap-4'
                >
                    <div
                        style={{ margin: "auto", width: "100%" }}
                        className='sm:w-2/5 mx-auto'
                    >
                        {event.image ? (
                            <Image
                                src={event.image}
                                width={450}
                                height={450}
                                alt='event pic'
                            />
                        ) : (
                            <Image
                                src='/event_image.png'
                                width={450}
                                height={450}
                                alt='event pic'
                            />
                        )}
                    </div>
                    <div style={{ width: "100%" }}>
                        <p>
                            <b>Location:</b> <br />
                            {event.location}
                            <br />
                            <br />
                            <b>Date and time:</b>
                            <br />
                            {event.date ? (
                                <span> {event.date}</span>
                            ) : (
                                <span> undefined</span>
                            )}{" "}
                            at
                            {event.time ? (
                                <span> {event.time}</span>
                            ) : (
                                <span> undefined</span>
                            )}
                            <br />
                            <br />
                            <br />
                            Organized by{" "}
                            {organizer.Name ? (
                                <b>
                                    {organizer.Name} {organizer.Surename}
                                </b>
                            ) : (
                                <b>Dude McGee</b>
                            )}
                        </p>
                        {userMail === organizer.email ? (
                            <>
                                <Link href={`/events/${event.eventId}/edit`}>
                                    <button
                                        className='btn btn-sm btn-wide opacity-80 hover:opacity-100'
                                        style={{
                                            marginTop: "1rem",
                                            borderRadius: "8px",
                                            background: "grey",
                                            border: 0,
                                            color: "white",
                                        }}
                                    >
                                        Edit event
                                    </button>
                                </Link>{" "}
                                <button
                                    className='btn btn-sm btn-wide hover:opacity-60'
                                    onClick={() =>
                                        document
                                            .getElementById("cancel_modal")
                                            .showModal()
                                    }
                                    style={{
                                        marginTop: "1rem",
                                        borderRadius: "8px",
                                        background: "red",
                                        border: 0,
                                        color: "white",
                                    }}
                                >
                                    Cancel event
                                </button>
                            </>
                        ) : findUser ? (
                            <button
                                className='btn btn-sm btn-wide opacity-50 cursor-default'
                                style={{
                                    marginTop: "1rem",
                                    borderRadius: "8px",
                                    background: "#FDA855",
                                    border: 0,
                                    color: "white",
                                }}
                            >
                                Already joined
                            </button>
                        ) : (
                            <button
                                className='btn btn-sm btn-wide'
                                onClick={() => joinEvent(event.eventId)}
                                style={{
                                    marginTop: "1rem",
                                    borderRadius: "8px",
                                    background: "#FDA855",
                                    border: 0,
                                    color: "white",
                                }}
                            >
                                Join now
                            </button>
                        )}
                    </div>
                </div>
                <div style={{ display: "flex", gap: "3rem" }}>
                    <div style={{ width: "500px" }}>
                        <h3 className='text-2xl font-bold'>
                            Event Description:
                        </h3>

                        {event ? (
                            <p>{event.description}</p>
                        ) : (
                            <p>
                                Loading... there might be no event description{" "}
                            </p>
                        )}
                    </div>

                    <div>
                        <h3 className='text-xl font-bold'>Attendees:</h3>
                        {attendeesArr.length > 0 ? (
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(4, 20px)",
                                    gap: "3rem",
                                    marginTop: "1rem",
                                }}
                            >
                                {attendeesArr.map((attendee, index) => (
                                    <div key={index}>
                                        <div
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                                background: "black",
                                                color: "white",
                                                textAlign: "center",
                                                padding: "8px",
                                            }}
                                        >
                                            {attendee.Surename.charAt(0)}.
                                        </div>
                                        <div>{attendee.Name}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='italic pt-3'>
                                No participant yet. Be the first to join!
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div style={{ height: "200px", marginTop: "4rem" }}></div>

            <dialog id='cancel_modal' className='modal'>
                <div className='modal-box'>
                    <h3 className='font-bold text-lg'>Warning</h3>
                    <p className='py-4'>You are about to cancel this event.</p>
                    <p>
                        This action will permanently delete all associated data.
                        Are you sure you want to proceed?
                    </p>
                    <div className='modal-action'>
                        <form method='dialog'>
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className='btn'
                                style={{
                                    background: "red",
                                    color: "white",
                                    marginRight: "1rem",
                                }}
                                onClick={deleteEvent}
                            >
                                Cancel event
                            </button>
                            <button className='btn'>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export async function getServerSideProps(context) {
    // Get the event ID from the URL uwu
    const eventId = context.params.eventId;

    // Fetch the event data from Firebase
    const eventRef = doc(db, "events", eventId);
    const eventDoc = await getDoc(eventRef);
    const event = eventDoc.data();

    const userId = event.organizer;

    const organizerRef = doc(db, "users", userId);
    const organizerDoc = await getDoc(organizerRef);
    const organizer = organizerDoc.data();

    return {
        props: {
            event: {
                ...event,
                eventId: eventId,
            },
            organizer,
        },
    };
}

export default EventsPage;
