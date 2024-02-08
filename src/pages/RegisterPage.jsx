import React, { useEffect, useRef, useState } from 'react'
import { Toaster, toast } from 'sonner';
import {Progress, Input, Button} from "@nextui-org/react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function RegisterPage() {
    
    const field1Ref = useRef();
    const field2Ref = useRef();
    const field3Ref = useRef();
    const url = process.env.REACT_APP_BASE_URL;
    const [isVisible, setisVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ init, setInit ] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);
    const toggleVisibility = () => {
        setisVisible(!isVisible);
    }
    const handleClick = () => {
        console.log("I Was Clicked");
    }
    const handleSumbit = () => {
        if(field1Ref.current.value === ""){
            toast.error("Username must be filled", {
                position: "top-right",
                duration: 5000
            })
        }
        if(field2Ref.current.value === ""){
            toast.error("email must be filled", {
                position: "top-right",
                duration: 5000
            })
        }
        if(field3Ref.current.value === ""){
            toast.error("password must be filled", {
                position: "top-right",
                duration: 5000
            })
        }
        if(field1Ref.current.value === "" || field2Ref.current.value === "" || field3Ref.current.value === ""){
            return;
        }
        axios.post(url+'/auth/register', {
            "username": field1Ref.current.value,
            "email": field2Ref.current.value,
            "password": field3Ref.current.value
        })
        .then(() => {
            toast.info("Sukses Mendaftar", {
                position: "top-right",
                duration: 5000
            });
            setIsLoading(true);
            navigate("/login")
        })
        .catch(() => {
            toast.info("Gagal Mendaftar", {
                position: "top-right",
                duration: 5000
            });
        })
        .finally(()=> {
            setIsLoading(false);
            alert(field1Ref.current.value + field2Ref.current.value + field3Ref.current.value)
        })

    }
  return (
    <div className="h-[100vh] w-full flex justify-center flex-wrap overflow-hidden dark">
        <Toaster/>
        <Progress aria-label="Loading..." radius="none" size="sm" isIndeterminate={isLoading} className={"border-0 w-[100%]"}/>
        { init && <Particles
            id="tsparticles"
            options={{
                background: {
                    color: {
                        value: "#14213d",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "triangle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
            />
        }
        <form onSubmit={handleSumbit} className='h-[100vh] w-[100%] flex items-center justify-center'>
            <div className="bg-transparent backdrop-brightness-110 backdrop-blur-md w-[35%] pt-[2em] flex flex-col rounded-md shadow-xl h-[70vh] text-white p-[1em] gap-[1em]">
                <p>Register</p>
                <Input ref={field1Ref} type="text" labelPlacement="outside" variant="bordered" label="Username"/>
                <Input ref={field2Ref} type="email" labelPlacement="outside" variant="bordered" label="Email" isRequired/>
                <Input
                ref={field3Ref} 
                label="Password"
                labelPlacement="outside"
                variant="bordered"
                placeholder="Enter your password"
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <IoIosEye className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none" />
                    )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                className="mt-5"
                />
                <Button onClick={handleSumbit} className="mt-5" color="primary">
                    Sumbit
                </Button>
                <Link to={"/login"} className='mt-6 font-normal cursor-pointer' onClick={handleClick}>Already have an account?</Link>
            </div>
        </form>
    </div>
  )
}

export default RegisterPage