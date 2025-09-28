import { useEffect, useRef, useState } from "react";
import useGetCategories from "../components/profile/useGetCategories";
import { useSearchParams } from "react-router-dom";
import { useGetProductsByCat } from "../components/useGetProductsByCat";
import Button from "./Button";
import Spinner from "./Spinner";
import { MdArrowDropDown } from "react-icons/md";
import { IoMdArrowDropdown, IoMdArrowDropleft } from "react-icons/io";

function Filter() {
  const { data: categories, isLoading } = useGetCategories();
  const { isLoading: isLoading2 } = useGetProductsByCat();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(value, name, open) {
    if (value === "all") {
      searchParams.delete("categoryId"); // نمسح الفلتر من الـ URL
      searchParams.delete("categoryName");
    } else if (value && !open) {
      searchParams.set("categoryId", value);
      searchParams.set("categoryName", name);
      setSelectedFilter(value);
    } else if (value && open) {
      setIsOpen((i) => !i);
      setSelectedFilter(value);
    }

    setSearchParams(searchParams);
  }

  const buildTree = (categories) => {
    const tree = [];
    const map = {};

    categories?.forEach((cat) => {
      map[cat.id] = { ...cat, children: [] };
    });

    categories?.forEach((cat) => {
      if (cat.parent_id) {
        map[cat.parent_id]?.children.push(map[cat.id]);
      } else {
        tree.push(map[cat.id]);
      }
    });

    return tree;
  };

  const categoryTree = buildTree(categories);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading && isLoading2) return <Spinner />;
  return (
    <>
      <nav className=" max-w-screen text-gray-600 flex flex-row-reverse flex-wrap gap-6 mx-auto p-4 border-b border-blue-200 dark:border-gray-800 ">
        <span
          className={`font-bold text-lg hover:underline hover:scale-110 hover:text-blue-300 hover:dark:text-purple-300 cursor-pointer underline `}
          onClick={() => handleClick("all")}
        >
          All
        </span>
        {categoryTree.map((parent) => (
          <div key={parent.id} className="relative">
            <div
              className={`font-bold text-lg underline cursor-pointer hover:scale-110 hover:text-blue-300 hover:dark:text-purple-300`}
            >
              <span onClick={() => handleClick(parent.id, parent.name, false)}>
                {parent.name}
              </span>
              <span onClick={() => handleClick(parent.id, parent.name, true)}>
                <IoMdArrowDropdown
                  className={`inline text-2xl hover:translate-y-1 duration-400 ${
                    isOpen && parent.id == selectedFilter && "translate-y-1 "
                  }
                    `}
                />
              </span>
            </div>
            {isOpen && parent.id == selectedFilter && (
              <ul
                ref={menuRef}
                className=" flex-col items-end absolute right-0 mt-2 w-25 bg-white text-gray-700 border border-gray-200 rounded-md shadow-lg z-55  font-medium flex  "
              >
                {parent.children.map((child) => (
                  <li
                    key={child.id}
                    className="w-full border-b border-gray-200 cursor-pointer px-4 py-2 hover:bg-blue-100 dark:hover:bg-purple-100 hover:text-gray-800"
                    onClick={() =>
                      handleClick(child.id, [parent.name, child.name])
                    }
                  >
                    {child.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}

export default Filter;
