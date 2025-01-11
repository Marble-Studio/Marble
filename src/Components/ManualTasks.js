import React, { useState, useEffect } from 'react';
import { doc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import { useUser } from '../context/userContext';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { CiNoWaitingSign } from 'react-icons/ci';

const ManualTasks = () => {
  const [showVerifyButtons, setShowVerifyButtons] = useState({});
  const [countdowns, setCountdowns] = useState({});
  const [buttonText, setButtonText] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [claiming, setClaiming] = useState({});
  const [submitted, setSubmitted] = useState({});
  const { id: userId, manualTasks, userManualTasks, setUserManualTasks, setBalance } = useUser();
  const [claimedBonus, setClaimedBonus] = useState(0);
  const [congrats, setCongrats] = useState(false);

  const performTask = (taskId) => {
    const task = manualTasks.find(task => task.id === taskId);
    if (task) {
      window.open(task.link, '_blank');
      setTimeout(() => {
        setShowVerifyButtons(prevState => ({ ...prevState, [taskId]: true }));
      }, 2000);
    }
  };

  const startCountdown = (taskId) => {
    setCountdowns(prevState => ({ ...prevState, [taskId]: 5 }));
    setButtonText(prevState => ({ ...prevState, [taskId]: 'Verifying...' }));

    const countdownInterval = setInterval(() => {
      setCountdowns(prevCountdowns => {
        const newCountdown = prevCountdowns[taskId] - 1;
        if (newCountdown <= 0) {
          clearInterval(countdownInterval);
          setCountdowns(prevState => ({ ...prevState, [taskId]: null }));
          setButtonText(prevState => ({ ...prevState, [taskId]: 'Verifying' }));
          setModalMessage(
            <div className="flex flex-col items-center space-y-2">
              <CiNoWaitingSign size={32} className="text-yellow-500" />
              <p className="text-center text-sm font-medium">Wait 30 minutes for moderation check to claim bonus!!</p>
              <p className="text-xs text-gray-400 text-center">Make sure to complete the task within 30 minutes!</p>
            </div>
          );
          setModalOpen(true);
          const saveTaskToUser = async () => {
            try {
              const userDocRef = doc(db, 'telegramUsers', userId);
              await updateDoc(userDocRef, {
                manualTasks: arrayUnion({ taskId: taskId, completed: false }),
              });
            } catch (error) {
              console.error("Error adding task to user's document: ", error);
            }
          };
          saveTaskToUser();
          setSubmitted(prevState => ({ ...prevState, [taskId]: true }));
          localStorage.setItem(`submitted_${taskId}`, true);
          return { ...prevCountdowns, [taskId]: null };
        }
        return { ...prevCountdowns, [taskId]: newCountdown };
      });
    }, 1000);
  };

  const claimTask = async (taskId) => {
    setClaiming(prevState => ({ ...prevState, [taskId]: true }));
    try {
      const task = manualTasks.find(task => task.id === taskId);
      const userDocRef = doc(db, 'telegramUsers', userId);
      await updateDoc(userDocRef, {
        manualTasks: userManualTasks.map(task =>
          task.taskId === taskId ? { ...task, completed: true } : task
        ),
        balance: increment(task.bonus),
      });
      setBalance(prevBalance => prevBalance + task.bonus);
      setUserManualTasks(prevTasks =>
        prevTasks.map(task =>
          task.taskId === taskId ? { ...task, completed: true } : task
        )
      );

      setModalMessage(
        <div className="flex flex-col items-center space-y-2">
          <IoCheckmarkCircleSharp size={32} className="text-green-500" />
          <p className="text-lg font-medium text-white">+{formatNumberCliam(task.bonus)} Marble CLAIMED!</p>
          <p className="text-xs text-gray-400 text-center">Keep completing tasks for more rewards!</p>
        </div>
      );
      setModalOpen(true);
      setClaimedBonus(task.bonus);
      setCongrats(true);

      setTimeout(() => {
        setCongrats(false);
      }, 4000);

    } catch (error) {
      console.error('Error updating task status to completed:', error);
    }
    setClaiming(prevState => ({ ...prevState, [taskId]: false }));
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const submittedStates = manualTasks.reduce((acc, task) => {
      const submittedState = localStorage.getItem(`submitted_${task.id}`) === 'true';
      acc[task.id] = submittedState;
      return acc;
    }, {});
    setSubmitted(submittedStates);
  }, [manualTasks]);

  const confirmTask = (taskId) => {
    console.log(`Task ${taskId} confirmed`);
  };

  const formatNumber = (num) => {
    if (num < 100000) {
      return new Intl.NumberFormat().format(num);
    } else if (num < 1000000) {
      return new Intl.NumberFormat().format(num);
    } else {
      return (num / 1000000).toFixed(3) + " M";
    }
  };

  const formatNumberCliam = (num) => {
    if (num < 100000) {
      return new Intl.NumberFormat().format(num);
    } else if (num < 1000000) {
      return new Intl.NumberFormat().format(num);
    } else {
      return (num / 1000000).toFixed(3) + " M";
    }
  };

  return (
    <>
      {manualTasks.sort((a, b) => a.id - b.id).map((task) => {
        const userTask = userManualTasks.find(t => t.taskId === task.id);
        const isTaskCompleted = userTask ? userTask.completed : false;
        const isTaskSaved = !!userTask;

        return (
          <div
            key={task.id}
            className="w-full bg-gradient-to-r from-blue-500 via-green-500 to-gray-700 p-1 rounded-lg mb-3 shadow-md"
          >
            <div className="flex justify-between items-center bg-gray-900 p-3 rounded-lg">
              <img
                alt="task icon"
                src={task.icon}
                className="w-12 h-12 rounded-md shadow-md"
              />
<div className="flex-1 ml-4">
  <h1 className="text-white font-semibold text-sm whitespace-normal overflow-hidden">
    {task.title}
  </h1>
  <span className="text-yellow-400 text-xs font-medium">
    +{formatNumber(task.bonus)} Points
  </span>
</div>
              <div className="flex space-x-2">
                {!isTaskSaved && !isTaskCompleted && (
                  <>
                    <button
                      onClick={() => performTask(task.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-1 px-2 rounded-md"
                    >
                      Perform
                    </button>
                    {countdowns[task.id] === undefined && (
                      <button
                        onClick={() => startCountdown(task.id)}
                        className={`${
                          showVerifyButtons[task.id] ? 'bg-yellow-400 text-black' : 'bg-gray-600 text-gray-400'
                        } text-xs font-semibold py-1 px-2 rounded-md`}
                        disabled={!showVerifyButtons[task.id]}
                      >
                        {submitted[task.id] ? 'Verifying' : 'Verify'}
                      </button>
                    )}
                  </>
                )}
                {isTaskSaved && !isTaskCompleted && (
                  <>
                    <button
                      onClick={() => confirmTask(task.id)}
                      className="bg-gray-600 text-gray-400 text-xs font-semibold py-1 px-2 rounded-md"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => claimTask(task.id)}
                      className="bg-green-500 text-white text-xs font-semibold py-1 px-2 rounded-md"
                      disabled={claiming[task.id]}
                    >
                      {claiming[task.id] ? 'Claiming...' : 'Claim'}
                    </button>
                  </>
                )}
                {countdowns[task.id] !== null && countdowns[task.id] !== undefined && (
                  <span className="bg-gray-800 text-gray-400 text-xs font-semibold py-1 px-2 rounded-md">
                    checking {countdowns[task.id]}s
                  </span>
                )}
                {isTaskCompleted && (
                  <>
                    <span className="bg-gray-600 text-gray-400 text-xs font-semibold py-1 px-2 rounded-md">
                      Completed
                    </span>
                    <IoCheckmarkCircleSharp size={24} className="text-green-500" />
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {congrats && (
        <div className="fixed top-[50px] left-0 right-0 flex justify-center z-50">
          <img src="/congrats.gif" alt="congrats" className="w-[80%]" />
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            {modalMessage}
            <div className="text-center mt-4">
              <button
                onClick={closeModal}
                className="bg-yellow-400 py-2 px-4 rounded-lg text-black font-medium"
              >
                Continue tasks
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManualTasks;
